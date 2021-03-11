import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import { Provider } from "redux-zero/preact";

import store from "./appStore";
import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <Provider store={store}>
                <Header />
                <Router>
                    <Route path="/" component={Home} />
                    <Route path="/profile/" component={Profile} user="me" />
                    <Route path="/profile/:user" component={Profile} />
                    <NotFoundPage default />
                </Router>
            </Provider>
        </div>
    );
};

export default App;
