import React from 'react';
import { connect } from 'react-redux';

import { add } from '../redux/actions/crud';

export default class HomeParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "TP REACT",
      content: "Content from Home",
      text: '',
      open: false,
    }
  }

  onClickAdd = () => {
    this.props.add(this.state.text);
    this.setState({ text: '' });
  }

  toogleModal = () => {
    this.setState({ open: !this.state.open });
  };
  
}

const mapStateToProps = state => ({
  crud: state.crud,
});

const mapDispatchToProps = dispatch => ({
  add: (payload) => {
    dispatch(add(payload));
  },
});

export const reduxConnect = component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
