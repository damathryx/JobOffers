
import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';

import { iconsMap, iconsLoaded } from './utils/AppIcons';
import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);

class App extends Component {
  constructor(props) {
    super(props);
    iconsLoaded.then(() => {
      this.startApp();
    });
  }
  startApp() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'example.FirstScreen', // unique ID registered with Navigation.registerScreen
        title: '', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {
          navBarTranslucent: true,
          drawUnderNavBar: true,
          navBarTransparent: true,
          navBarButtonColor: '#FFFFFF'
        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {
          rightButtons: [
            {
              icon: iconsMap.search, // for icon button, provide the local image asset name
              id: 'search' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            }
          ],
          leftButtons: [
            {
              icon: iconsMap.list, // for icon button, provide the local image asset name
              id: 'list' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            }
          ]
        } // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      },
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
      animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
    });
  }
}

export default App;