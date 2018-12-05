import React from 'react';
import { Text, View  } from 'react-native';

export default class About extends React.Component {
  static navigationOptions = {
    title: 'Aboutcreen',
  };
  render() {
     return (
        <View>
           <Text>{'Aboutcreen'}</Text>
        </View>
     );
  }
}
