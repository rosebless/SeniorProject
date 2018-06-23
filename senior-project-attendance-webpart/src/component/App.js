import React from 'react' 
import { BrowserRouter, Switch, Route } from 'react-router-dom' 
import Login from './Login'
import Menu from './Menu' 
import Import from './Import'
import Export from './Export'  
import '../css/style.css'

export default class App extends React.Component {
    render() {
        console.log(' ------------------------------------------------ lastest ------------------------------------------------ ')
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} /> {/* exact เป็นการกันการชนของ path */}
                    <Route exact path='/menu' component={Menu} />
                    <Route path='/menu/import' component={Import} />
                    <Route path='/menu/export' component={Export} />
                </Switch> 
            </BrowserRouter>
        );
    }
} 