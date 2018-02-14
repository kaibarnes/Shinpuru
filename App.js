import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import SavedVocabulary from './components/SavedVocabulary';

const RootNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  SavedVocabulary: {
    screen: SavedVocabulary
  }
});

export default RootNavigator;
