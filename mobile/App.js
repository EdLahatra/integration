import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/redux/store';
import HomeScreen from './src/screens/home';
import About from './src/screens/about';
import Contact from './src/screens/contact';

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Contact: Contact,
  About: About,
});

const AppContainer = createAppContainer(TabNavigator);

class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

export default App;
