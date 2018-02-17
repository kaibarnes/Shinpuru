import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  Text,
  FlatList,
  Dimensions
} from 'react-native';
import { Card } from './Card';
import { CardSection } from './CardSection';

class SavedVocabulary extends Component {
  constructor() {
    super();
    this.state = { vocabularyList: null };

    this.renderVocabulary = this.renderVocabulary.bind(this);
  }
  static navigationOptions = () => ({
    title: 'Favorites',
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.headerStyle,
    headerTintColor: 'white'
  });
  componentDidMount() {
    AsyncStorage.getItem('ListStore').then(vocabularyList => {
      if (vocabularyList !== this.state.vocabularyList) {
        this.setState({ vocabularyList: JSON.parse(vocabularyList) });
      }
    });
  }
  renderVocabulary() {
    if (this.state.vocabularyList) {
      const vocabularyList = this.state.vocabularyList;
      return (
        <FlatList
          data={vocabularyList}
          keyExtractor={item => item.reading}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <Card style={styles.cardStyles}>
                <CardSection style={styles.englishContainer}>
                  <Text style={styles.englishStyle}>{item.wordSearched}</Text>
                </CardSection>
                <CardSection style={styles.japaneseContainer}>
                  <Text style={styles.japaneseStyle}>{item.kanji}</Text>
                </CardSection>
                <CardSection style={styles.japaneseContainer}>
                  <Text style={styles.japaneseStyle}>{item.reading}</Text>
                </CardSection>
              </Card>
            );
          }}
        />
      );
    }
    return (
      <View style={styles.defaultTextContainer}>
        <Text style={styles.defaultText}>
          It looks like you don't have any favorites yet
        </Text>
        <Text style={styles.defaultText}>
          Find something you like on the main screen and check back here
        </Text>
      </View>
    );
  }

  render() {
    return <View style={styles.appStyle}>{this.renderVocabulary()}</View>;
  }
}

const deviceWidth = Dimensions.get('window').width;
const cardMargin = deviceWidth / 80;
const cardWidth = (deviceWidth - cardMargin * 6) / 3;

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
  cardStyles: {
    width: cardWidth,
    marginHorizontal: cardMargin
  },
  englishContainer: {
    justifyContent: 'center'
  },
  englishStyle: {
    fontSize: 18
  },
  japaneseContainer: {
    justifyContent: 'center'
  },
  japaneseStyle: {
    fontSize: 15
  }
});

export default SavedVocabulary;
