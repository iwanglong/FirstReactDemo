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
  Alert
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

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data: [], isLoading: true };
    this._fetchData = this._fetchData.bind(this);
    this._renderMovie = this._renderMovie.bind(this);
  }
  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    fetch(REQUEST_TOP_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          // movies: responseData.movies,
          data: this.state.data.concat(responseData.movies),
          isLoading: false
        });
      })
  }

  render() {

    if (this.state.isLoading) {
      return this._renderLoadingView();
    }

    return (
      <FlatList data={this.state.data} renderItem={this._renderMovie} style={styles.list} ></FlatList>
    );
  }

  _renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>数据加载中</Text>
      </View>
    );
  }
  _renderMovie({ item }) {

    return (
      <TouchableOpacity onPress={this.onPressButton}>
        <View style={styles.container}>

          <View style={styles.contentContainer}>
            <Image source={{ uri: item.posters.thumbnail }} style={styles.thumbnail} />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.year}>{item.year}</Text>
            </View>
          </View>

          <View style={styles.line}></View>

        </View>
      </TouchableOpacity>


    );

  }

  onPressButton = ()=> {
    alert('000000000')
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'gray',
    height: 80
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: 79
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 60,
    marginLeft: 15
  },
  line: {
    height: 1,
    backgroundColor: 'gray'
  },
  list: {
    marginTop: 64,
    backgroundColor: "#F5FCFF"
  }
});
