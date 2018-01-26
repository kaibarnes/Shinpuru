import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { Header } from './components/Header';
import Translation from './components/Translation';
import { Button } from './components/Button';

class App extends Component {
  constructor() {
    super();
    this.state = { searchText: '', loading: false };
    this.onSearch = this.onSearch.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }
  onSearch() {
    if (this.state.searchText.length > 1) {
      this.setState({ loading: true });
      const searchQuery =
        'http://jisho.org/api/v1/search/words?keyword=' +
        this.state.searchText.toLowerCase();
      return fetch(searchQuery)
        .then(response => response.json())
        .then(responseJson => {
          const kanji = responseJson.data[0].japanese[0].word;
          const reading = responseJson.data[0].japanese[0].reading;
          this.setState({
            kanji,
            reading,
            searchText: '',
            loading: false
          });
        })
        .catch(error => {
          alert(error);
          this.setState({
            loading: false
          });
        });
    }
  }
  renderContent() {
    if (this.state.loading === true) {
      return <ActivityIndicator size="large" color="#f5f5f5" />;
    }
    if (this.state.kanji && this.state.reading) {
      return (
        <Translation kanji={this.state.kanji} reading={this.state.reading} />
      );
    }
  }
  render() {
    return (
      <View style={styles.appStyle}>
        <Header title="Shinpuru" />
        <View style={styles.container}>
          <View style={styles.contentStyle}>{this.renderContent()}</View>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => this.setState({ searchText: text })}
            value={this.state.searchText}
          />
          <Button title="Search" onPress={this.onSearch} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appStyle: {
    backgroundColor: '#334d5c',
    flex: 1
  },
  container: {
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
    flex: 1
  },
  contentStyle: {
    height: 130
  },
  textInputStyle: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
    paddingHorizontal: 5
  }
});

export default App;
