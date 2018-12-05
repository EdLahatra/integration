import React from 'react';
import { Text, View, TextInput, TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';

// import config from 'config';

import { add } from '../redux/actions/crud';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }
  static navigationOptions = {
    title: 'HomeScreen',
  };

  onClickAdd = () => {
    this.props.add(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    // console.log('config config', config);
    const { crud } = this.props;
      const { text } = this.state;
    return (
      <View>
          <Text>{'HomeScreen'}</Text>
          <TextInput
            value={text}
            onChangeText={text => this.setState({ text })}
          />
          <TouchableOpacity onPress={this.onClickAdd}>
            <Text>Add</Text>
          </TouchableOpacity>
          <View>
            {crud.list.map((item, key) => {
              return <Text key={key}>{item}</Text>
            })}
          </View>
      </View>
    );
  }
}
  
const mapStateToProps = state => ({
  crud: state.crud,
});

const mapDispatchToProps = dispatch => ({
  add: (payload) => {
    dispatch(add(payload));
  },
});
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
