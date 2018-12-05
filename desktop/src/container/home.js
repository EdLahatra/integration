import React from 'react';

import HomeParent, { reduxConnect } from 'super_container/home';
import Modal from '../component/modalForm';

class Home extends HomeParent {
  render() {
    const { crud } = this.props;
    const { text, title, content, open } = this.state;
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
        <Modal
          toogleModal={this.toogleModal}
          open={open}
        />
      </div>
    );
  }
}

export default reduxConnect(Home);
