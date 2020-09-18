import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RestaurantContextProvider } from './context/RestaurantContext';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import RestaurantUpdate from './pages/RestaurantUpdate';

const App = () => {
  return (
    <RestaurantContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/restaurants/:id' component={RestaurantDetail} />
            <Route exact path='/restaurants/:id/update' component={RestaurantUpdate} />
          </Switch>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
}

export default App;