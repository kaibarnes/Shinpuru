import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Text,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Translation from './components/Translation';
import SavedVocabulary from './components/SavedVocabulary';

class App extends Component {
  constructor() {
    super();
    this.state = { searchText: '', loading: false };
    this.onSearch = this.onSearch.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'My Profile!',
    headerRight: (
      <Button
        title="Favorites"
        onPress={() => {
          navigation.navigate('SavedVocabulary');
        }}
      />
    )
  });
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
            wordSearched: this.state.searchText,
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
  async handleSave() {
    // await AsyncStorage.removeItem('ListStore');
    try {
      const value = await AsyncStorage.getItem('ListStore');
      console.log('first value', value);
      if (value) {
        try {
          const { kanji, reading, wordSearched } = this.state;

          const value = await AsyncStorage.getItem('ListStore');
          const parsedValue = JSON.parse(value);

          const newItem = { wordSearched, kanji, reading };
          const list = JSON.stringify([...parsedValue, newItem]);

          await AsyncStorage.setItem('ListStore', list);
        } catch (error) {
          alert(error);
        }
      } else {
        try {
          const { kanji, reading, wordSearched } = this.state;
          const list = JSON.stringify({ wordSearched, kanji, reading });
          await AsyncStorage.setItem('ListStore', list);
        } catch (error) {
          alert(error);
        }
      }
    } catch (error) {
      alert(error);
    }
  }
  renderContent() {
    if (this.state.loading === true) {
      return <ActivityIndicator size="large" color="#f5f5f5" />;
    }
    if (this.state.kanji || this.state.reading) {
      return (
        <View>
          <Translation kanji={this.state.kanji} reading={this.state.reading} />
          <Button onPress={this.handleSave} title="Add" />
        </View>
      );
    }
  }
  render() {
    return (
      <View style={styles.appStyle}>
        <View style={styles.container}>
          <View style={styles.translationContainerStyle}>
            {this.renderContent()}
          </View>
          <View style={styles.searchContainerStyle}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={text => this.setState({ searchText: text })}
              value={this.state.searchText}
              onSubmitEditing={this.onSearch}
            />
            <Button title="Search" onPress={this.onSearch} />
          </View>
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
  startingTextStyle: {
    fontSize: 20,
    marginHorizontal: 30,
    marginTop: 30,
    color: 'lightgray'
  },
  translationContainerStyle: {
    flex: 1
  },
  searchContainerStyle: {
    flex: 1
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

const RootNavigator = StackNavigator({
  Home: {
    screen: App
  },
  SavedVocabulary: {
    screen: SavedVocabulary,
    navigationOptions: {
      headerTitle: 'Saved Vocabulary'
    }
  }
});

export default RootNavigator;
