import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {useState, useEffect} from 'react';
import Home from './pages/home'
import Dashboard from './pages/Dashboard'
import Movie from './pages/Movie'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'

import AuthService from "./pages/services/auth.service"

function App() {
  const [currentUser, setCurrentUser] = useState(false)

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if(user){
      setCurrentUser(user)
    }
  }, [])

  return (
    <div>
       <h1>Demo Log In</h1>
      <div>
      {
        currentUser === false
        ? <h2>Logged In</h2>
        : <h2> Logged out</h2>
      }
      </div>
      <section>
          <Routes>
              <Route path="/dashboard" exact element={<Dashboard/>}/>
              <Route path="/" exact element={<Home/>}/>
              <Route path="/movie/:id" exact element={<Movie/>}/>
              <Route path="/login" exact element={<LogIn/>}/>
              <Route path="/signup" exact element={<SignUp/>}/>
          </Routes>
        </section>
  </div>
  );
}

export default App;
