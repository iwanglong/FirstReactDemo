/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Alert,
    Dimensions,
    ActivityIndicator,
    Modal
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

var REQUEST_URL =
    "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

var REQUEST_TOP_URL =
    "https://cnodejs.org/api/v1/topics";

var MOCKED_MOVIES_DATA = [
    {
        title: "标题",
        year: "2015",
        posters: { thumbnail: "https://i.imgur.com/UePbdph.jpg" }
    }
];

const TOPBAR_ITEMS = [
    // id name selected 选中状态
    { id: 'all', name: '全部', selected: true },
    { id: 'good', name: '精华', selected: false },
    { id: 'share', name: '分享', selected: false },
    { id: 'ask', name: '问答', selected: false },
    { id: 'job', name: '招聘', selected: false }
]

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allData: [],
            shareData: [],
            goodData: [],
            askData: [],
            jobData: [],
            isLoading: true,
            topBarItems: [
                // id name selected 选中状态
                { id: 'all', name: '全部', selected: true },
                { id: 'good', name: '精华', selected: false },
                { id: 'share', name: '分享', selected: false },
                { id: 'ask', name: '问答', selected: false },
                { id: 'job', name: '招聘', selected: false }
            ],
            tab: 'all',
            pageNum: 1
        };
        this._fetchData = this._fetchData.bind(this);
        this._renderMovie = this._renderMovie.bind(this);
        this._renderTopbarItems = this._renderTopbarItems.bind(this);
    }
    componentDidMount() {
        this._fetchData();
    }

    render() {

        // if (this.state.isLoading) {
        //     return this._renderLoadingView();
        // }

        return (
            <View style={styles.container}>
                {
                    this._renderLoadingView(this.state.isLoading)
                }


                <FlatList data={this.state.topBarItems} renderItem={this._renderTopbarItems}
                    horizontal={true}
                    extraData={this.state}
                    keyExtractor={(item, index) => item.id}
                    style={styles.topbar} />
                <FlatList data={this.state.data}
                    renderItem={this._renderMovie}
                    style={styles.list}
                    keyExtractor={(item, index) => item.id}
                    ItemSeparatorComponent={this._renderSeparator}
                    onEndReached={this._onEndReached}
                    ListFooterComponent={this._renderLoadingView}></FlatList>
            </View>
        );
    }
    /** 
     * 展示topbar 部分
     * */
    _renderTopbarItems({ item }) {
        return (
            <TouchableOpacity onPress={this._onPressTopBar.bind(this, item.id)}>
                <View >
                    <Text style={item.selected ? styles.topbarItemSelected : styles.topbarItem}>{item.name}</Text>
                </View>
            </TouchableOpacity>

        )
    }
    _renderLoadingView(bool) {
        if (bool) {
            return (                
                <Modal style={styles.unloadContainer} >
                    <ActivityIndicator size="large" color="red"></ActivityIndicator>
                </Modal>
            );
        } else {
            return (
                <View />
            );
        }

    }
    _renderMovie({ item }) {

        return (
            <TouchableOpacity onPress={this.onPressButton.bind(this, item.id)}>
                <View style={styles.contentContainer}>

                    <View style={styles.rightContainer}>
                        <View style={styles.author}>

                            <Image source={{ uri: item.author.avatar_url }} style={styles.thumbnail} />
                            <Text style={styles.authorName}>{item.author.loginname}</Text>
                            {
                                item.top ? <View><Text style={[styles.hot]}>置顶</Text></View> : null

                            }
                            {
                                item.good ? <View><Text style={styles.tag}>精华</Text></View> : null
                            }
                            {/* <Text style={[styles.hot]}>置顶</Text>

                            <Text style={styles.tag}>精华</Text> */}
                            {/* <CustomText itemInfo = {item}></CustomText> */}

                        </View>

                        <View style={styles.barInfo}>
                            <View style={styles.barInfoItem}>
                                <Image source={require('./image/visit.png')} style={styles.barInfoItemIcon} />
                                <Text style={styles.barInfoItemNumber}>{item.visit_count}</Text>
                            </View>
                            <View style={styles.barInfoItem}>
                                <Image source={require('./image/reply.png')} style={styles.barInfoItemIcon} />
                                <Text style={styles.barInfoItemNumber}>{item.reply_count}</Text>
                            </View>

                        </View>
                    </View>

                    <View >
                        <Text style={styles.title}>{item.title}</Text>
                    </View>

                </View>

            </TouchableOpacity>


        );

    }

    _renderSeparator() {
        return (
            <View style={styles.line}>

            </View>
        )
    }

    onPressButton(id) {
        // alert(id)


    }

    _onPressTopBar(id) {

        var tab = id
        var topBarItems = this.state.topBarItems;

        for (var i = 0; i < topBarItems.length; i++) {
            if (tab === topBarItems[i].id) {
                topBarItems[i].selected = true;
            } else {
                topBarItems[i].selected = false;
            }
        }

        this.setState({
            topBarItems: topBarItems,
            tab: tab,
            isLoading: true
        })
        // alert(this.state.tab)

        this._fetchData({ tab })


    }
    _onEndReached = () => {
        var page = ++this.state.pageNum
        this.setState({
            page: page
        })

        this._renderLoadingView();

        this._fetchData({ page });
    }

    _fetchData = (param) => {

        var url = REQUEST_TOP_URL + '?' + this._handleParam(param);
        console.log(url);

        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                var tempData = [];
                var key = this.state.tab
                switch (key) {
                    case 'all':
                        tempData = this.state.allData.concat(responseData.data)
                        break;
                    case 'good':
                        tempData = this.state.goodData.concat(responseData.data)
                        break;
                    case 'share':
                        tempData = this.state.shareData.concat(responseData.data)
                        break;
                    case 'ask':
                        tempData = this.state.askData.concat(responseData.data)
                        break;
                    case 'job':
                        tempData = this.state.jobData.concat(responseData.data)
                        break;
                    default:
                        tempData = this.state.data.concat(responseData.data)
                        break;
                }
                this.setState({

                    data: tempData,
                    isLoading: false
                });
            })

    }
    _handleParam(param) {
        if (param) {
            console.log(Object.keys(param));
            return Object.keys(param).map((item) => {
                console.log(item.toString() + '=' + param[item].toString())
                return item.toString() + '=' + param[item].toString()
            }).join('&')
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'gray',
        // height: 80,
        // top:64
    },
    topbar: {


        marginTop: 64,
        height: 36,
        // width: '100%'

    },
    topbarItem: {
        // display:'inline-block',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 5,
        backgroundColor: '#444',
        color: '#80bd01',
        fontSize: 14,
        lineHeight: 36,
        textAlign: 'center',
    },

    topbarItemSelected: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 5,
        backgroundColor: '#80bd01',
        color: 'white',
        fontSize: 14,
        lineHeight: 36,
        textAlign: 'center',
    },
    unloadContainer: {
        // flex: 1,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 99,
        zIndex:999
        // opacity: 0.7,

    },
    contentContainer: {
        // flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height: 79
    },
    rightContainer: {
        // flex: 1,
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor: 'blue',
        height: 40

    },
    author: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        // backgroundColor: 'blue',
        height: 40
    },
    authorName: {
        color: '#666',

        lineHeight: 30,
        marginLeft: 5,
        fontSize: 12
    },
    tag: {
        backgroundColor: '#fff',
        // boder: 1px #80bd01 solid,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#80bd01',
        padding: 2,
        borderRadius: 3,
        color: '#80bd01',
        fontSize: 12,
        marginLeft: 6,
        // marginTop: 0,
        // marginRight: 8,
        // marginBottom: 5
        // margin: 6 0 8 5,

    },
    hot: {
        // border: 1px #e25242 solid,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e25242',
        color: '#e25242',
        padding: 2,
        borderRadius: 3,
        fontSize: 12,
        marginLeft: 6,
        // marginTop: 0,
        // marginRight: 8,
        // marginBottom: 5
    },
    title: {

        color: '#2c3e50',
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,

        // lineHeight: 5,
        // padding: 5
    },
    year: {
        textAlign: 'left',
    },
    thumbnail: {
        width: 30,
        height: 30,
        // marginLeft: 5,
        borderRadius: 3

    },
    line: {
        height: 1,
        backgroundColor: '#80bd01'

    },
    list: {
        height: Dimensions.get('window').height - 64 - 36,
        // Top:100,
        backgroundColor: "#F5FCFF"
    },
    barInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 14,
        marginTop: 5,
        // width: 80,
        // backgroundColor: 'green'
    },
    barInfoItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 5
    },
    barInfoItemIcon: {
        width: 12,
        height: 12
    },
    barInfoItemNumber: {
        color: '#999',
        fontSize: 12,
        lineHeight: 14,
        marginLeft: 5
    }

});
