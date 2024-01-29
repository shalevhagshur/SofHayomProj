import { AppRegistry } from 'react-native';
import App from './App';
import { expo as appJson } from './app.json';

AppRegistry.registerComponent(appJson.name, () => App);
