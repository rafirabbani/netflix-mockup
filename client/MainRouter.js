import React from 'react'
import axios from 'axios'
import { Switch, Route, Redirect } from "react-router-dom";
import MainLayout from './views/MainLayout'
import Dashboard from './views/Dashboard';
import Home from './views/Home'
import Movies from './views/Movies/Movies'
import Casts from './views/Casts/Casts'
import Comments from './views/Comments/Comments'
import Users from './views/Users/Users'
import Login from './views/Auth/Login'

const authGuard = (Component) => {
  const element = <Component />
  let auth = JSON.parse(localStorage.getItem('data'))
  if (auth === null) {
    return <Redirect to="/netflix-mockup/login" />
  }
  else {
      axios.post(`/api/auth/requiresignin`, {}, {
        headers: { 
          'Authorization': `Bearer ${auth.token}`}
      })
      .then(result => {
        console.log(result)
      })
      .catch (err => {
        console.log(err.response)
        return <Redirect to='/netflix-mockup/login' />
      })
      return element
  } 
}

const MainRouter = () => {
  
  return (
  <>
    <Switch>
      <Route exact path = '/netflix-mockup/login/' component={Login}/>
      <Route exact path ='/netflix-mockup/' component={Home}/>
      <MainLayout>
        <Route exact path="/netflix-mockup/dashboard" component={Dashboard}/>
        <Route exact path="/netflix-mockup/movies" component={Movies} />
        <Route exact path="/netflix-mockup/comments" component={Comments}/>
        <Route exact path="/netflix-mockup/casts" component={Casts} />
        <Route exact path="/netflix-mockup/users" component={Users} />
      </MainLayout>
    </Switch>
  </>)
}

export default MainRouter