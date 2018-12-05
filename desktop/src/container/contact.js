import React from 'react';

export default class Contact extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         title: "TP REACT",
         content: "Content from Contact"
      }
    }

    render() {
      return (
          <div>
            <h2>{this.state.title}</h2>
            <p>{this.state.content}</p>
          </div>
      );
    }
}
