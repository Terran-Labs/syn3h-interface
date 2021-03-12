// @ts-nocheck
import { FunctionalComponent, h } from "preact"
import { Scrollbars } from "preact-custom-scrollbars"
import { Route, Router } from "preact-router"
import { Provider } from "redux-zero/preact"

import Dev from "../routes/dev"
import Home from "../routes/home"
import NotFoundPage from "../routes/notfound"
import Profile from "../routes/profile"
import store from "./appStore"
import Header from "./header"

const App: FunctionalComponent = () => {
    return (
        <Provider store={store}>
            <div id="app">
                <Header />
                <Scrollbars style={{ width: "100%", height: "100%" }}>
                    <Router>
                        <Route path="/" component={Home} />
                        <Route path="/settings/" component={Profile} user="me" />
                        <Route path="/me" component={Profile} user="me" />
                        <Route path="/dev" component={Dev} />
                        <NotFoundPage default />
                        {/* <Route path="/profile/:user" component={Profile} /> */}
                    </Router>
                </Scrollbars>
            </div>
        </Provider>
    )
}

export default App
