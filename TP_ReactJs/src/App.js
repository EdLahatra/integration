import React from 'react';
import { Route, Link } from 'react-router-dom';

import Home from './screens/home';
import About from './screens/about';
import Contact from './screens/contact';

class App extends React.Component {
   render() {
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
