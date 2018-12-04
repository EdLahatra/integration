import React from 'react';
import { connect } from 'react-redux';

import { add } from '../redux/actions/crud';

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         title: "TP REACT",
         content: "Content from Home",
         text: '',
      }
    }

    onClickAdd = () => {
      this.props.add(this.state.text);
      this.setState({ text: '' });
    }

    render() {
      const { crud } = this.props;
      const { text, title, content } = this.state;
      return (
          <div>
            <h2>{title}</h2>
            <p>{content}</p>
            <input
              type="text"
              value={text}
              onChange={e => this.setState({ text: e.target.value })}
            />
            <button type="button" onClick={this.onClickAdd}>Add</button>
            <div>
              {crud.list.map((item, key) => {
                return <p key={key}>{item}</p>
              })}
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
