import React from 'react';

export default class About extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         title: "TP REACT",
         content: "Content from About"
      }
    }

    render() {
      return (
          <div>
            <h2>{this.state.title}</h2>
            <p>{this.state.content}</p>
            <button onClick={() => this.props.history.push('/home')}>Aller dans Home</button>
          </div>
      );
    }
}
