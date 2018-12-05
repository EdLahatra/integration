import React from 'react';
import { Text, View  } from 'react-native';

export default class Content extends React.Component {
  static navigationOptions = {
    title: 'Contentcreen',
  };
  render() {
      return (
      <View>
        <Text>{'Content'}</Text>
      </View>
      );
  }
}
