import PropTypes from "prop-types"
import React, { Component } from 'react';
import {
    View,
    Text,
    NavigatorIOS,
    TouchableHighlight,
    NativeModules
} from 'react-native'

var nativeModule = NativeModules.OpenNativeModule;


export default class NavigatorIOSExample extends Component {

    _jumpToNative=()=>{
        nativeModule.openNativeVC('1')
    }
    render() {
        return (
            // <NavigatorIOS
            //     initialRoute={{
            //         component: MyScene,
            //         title: 'My Initial Scene',
            //         passProps: { title: 'test' },
            //     }}
            //     style={{ flex: 1 }} />

            <TouchableHighlight onPress={this._jumpToNative}>
                <Text style={{marginTop:64}}>这里是跳转native的</Text>
            </TouchableHighlight>
        )
    }
}

class MyScene extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigator: PropTypes.object.isRequired,
    }

    _onForward = () => {
        // alert(this.props.navigator.pop)
        this.props.navigator.push({
            component: Scene,
            title: 'Scene',
            leftButtonTitle: '返回',
            onLeftButtonPress: () => {
                this.props.navigator.pop();
            }
        });
    }

    render() {
        return (
            <View style={{ marginTop: 64 }}>
                <Text>Current Scene: {this.props.title}</Text>
                <TouchableHighlight onPress={this._onForward}>
                    <Text>Tap me to load the next scene</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

class Scene extends Component {
    render() {
        return (
            <View>
                <Text>.......hhhhhhhhhhh........</Text>
            </View>
        )
    }
}

