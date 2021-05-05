import React from 'react'
import { Switch, Route } from "react-router-dom";
import MainLayout from './views/MainLayout'
import Dashboard from './views/Dashboard';
import Home from './views/Home'



const MainRouter = () => {
  return (
  <>
    <Switch>
      <Route exact path ='/netflix-mockup/' component={Home}/>
      <MainLayout>
        <Route exact path="/netflix-mockup/dashboard" component={Dashboard}/>
        {/* <Route exact path="/netflix-mockup/movies" component={Movies} />
        <Route exact path="/netflix-mockup/comments" component={Comments} />
        <Route exact path="/netflix-mockup/casts" component={Casts} />
        <Route exact path="/netflix-mockup/users" component={Users} /> */}
      </MainLayout>
    </Switch>
  </>)
}

export default MainRouter