import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Example } from './routers'
import Main from '../components/Layout/Main'
import Admin from '../containers/Admin'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { Laptop, UI, Form, Table, Gallery, Map, Charts } = Example;

        return (
            <HashRouter>
                <Main>
                    <Switch>
                        <Route path="/login" component={ Login } />
                        <Route path="/" children={()=>
                            <Admin>
                                <Route path="/example" children={()=>
                                    <Switch>
                                        <Route path='/example/laptop' component={ Laptop } />
                                        <Route path='/example/ui/buttons' component={ UI.Buttons } />
                                        <Route path='/example/ui/modals' component={ UI.Modals } />
                                        <Route path='/example/ui/loadings' component={ UI.Loadings } />
                                        <Route path='/example/ui/tabs' component={ UI.Tabs } />
                                        <Route path='/example/ui/carousel' component={ UI.Carousel } />
                                        <Route path='/example/form/login' component={ Form.Login } />
                                        <Route path='/example/form/register' component={ Form.Register } />
                                        <Route path='/example/form/rich' component={ Form.RichText } />
                                        <Route path='/example/table/basic' component={ Table.BasicTable } />
                                        <Route path='/example/table/high' component={ Table.HighTable } />
                                        <Route path='/example/charts/bar' component={ Charts.Bar } />
                                        <Route path='/example/charts/pie' component={ Charts.Pie } />
                                        <Route path='/example/charts/line' component={ Charts.Line } />
                                        <Route path='/example/gallery' component={ Gallery } />
                                        <Route path='/example/map' component={ Map } />
                                    </Switch>
                                } />
                                <Redirect to="/example/laptop" />
                            </Admin>
                        } />
                    </Switch>
                </Main>
            </HashRouter>
        );
    }
}
export default App;