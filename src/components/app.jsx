import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamCreate from './streams/stream-create';
import StreamDelete from './streams/stream-delete';
import StreamEdit from './streams/stream-edit';
import StreamList from './streams/stream-list';
import StreamShow from './streams/stream-show';
import Header from './header';
import history from '../history';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <div className="container">
          <Route path='/' exact component={StreamList} />
          <Route path='/streams/new' exact component={StreamCreate} />
          <Route path='/streams/edit/:id' exact component={StreamEdit} />
          <Route path='/streams/delete/:id' exact component={StreamDelete} />
          <Route path='/streams/show' exact component={StreamShow} />
        </div>
      </Router>
    </div>
  );
}

export default App;
