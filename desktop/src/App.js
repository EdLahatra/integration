import React from 'react';
import { Route, Link } from 'react-router-dom';

import config from 'config';

import Home from './container/home';
import About from './container/about';
import Contact from './container/contact';

class App extends React.Component {
   render() {
      console.log('alias ', config);
      return (
         <div>
            <Header title="Header" />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </div>
      );
   }
}
class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.title}</h1>
            <ul>
               <li><Link to="/home">Home</Link></li>
               <li><Link to="/about">About</Link></li>
               <li><Link to="/contact">Contact</Link></li>
            </ul>
         </div>
      );
   }
}

export default App;
