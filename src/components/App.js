import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import StreamDelete from './streams/StreamDelete';
import Header from './Header';
import history from '../history';

const App = () => {
    return ( 
        <div className="ui container">

            {/* //here we use plane router inorder to use our own history */}
            
            <Router history={history}>
            <div>
                <Header/>
                {/* here we use switch because switch will return only one of the match, other wise it may return multiple routes. */}
                <Switch>
                <Route path="/" exact component={StreamList}/>
                <Route path="/streams/new" exact component={StreamCreate}/>
                {/* react-router-dom automatically send some props to the components so streamEdit receives info about the path url etc, so we can access the id from the props and we can render the component accordingly.*/}
                <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                <Route path="/streams/delete/:id" exact component={StreamDelete}/>
                <Route path="/streams/:id" exact component={StreamShow}/>
                </Switch>

            </div>
            </Router>
        </div>
     );
}
 
export default App;