import React from 'react' 
import { BrowserRouter, Switch, Route } from 'react-router-dom' 
import Login from './Login'
import Menu from './Menu' 
import Import from './Import'
import Export from './Export' 

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} /> {/* exact เป็นการกันการชนของ path */}
                    <Route path='/menu' component={Menu} />
                    <Route path='/import' component={Import} />
                    <Route path='/export' component={Export} />
                </Switch> 
            </BrowserRouter>
        );
    }
} 