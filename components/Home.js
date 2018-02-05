import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Text,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Translation from './Translation';
import SavedVocabulary from './SavedVocabulary';
import CustomButton from './Button';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { searchText: '', loading: false };
    this.onSearch = this.onSearch.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Shinpuru',
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.headerStyle,
    headerRight: (
      <Button
        title="Favorites"
        color="white"
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
          <CustomButton
            onPress={this.handleSave}
            title="Favorite"
            style={styles.FavoriteButton}
          />
        </View>
      );
    }
    return (
      <View style={styles.defaultTextContainer}>
        <Text style={styles.defaultText}>
          Enter an English word above to get a Japanese translation
        </Text>
        <Text style={styles.defaultText}>
          Shinpuru isn't very smart, so keep it シンプル
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.appStyle}>
        <View style={styles.searchContainerStyle}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => this.setState({ searchText: text })}
            value={this.state.searchText}
            onSubmitEditing={this.onSearch}
            placeholder="Search"
          />
        </View>
        <View style={styles.container}>{this.renderContent()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appStyle: {
    flex: 1
  },
  headerStyle: {
    backgroundColor: '#ce1a1a',
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    fontFamily: 'American Typewriter'
  },
  searchContainerStyle: {
    backgroundColor: '#ce1a1a',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 0
  },
  textInputStyle: {
    width: 220,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  container: {
    marginVertical: 100,
    marginHorizontal: 20,
    flex: 1
  },
  defaultTextContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flex: 1
  },
  defaultText: {
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center',
    color: 'gray'
  },
  translationContainerStyle: {
    flex: 1
  },
  FavoriteButton: {
    backgroundColor: '#ce1a1a'
  }
});
