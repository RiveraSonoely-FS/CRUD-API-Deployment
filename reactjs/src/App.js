import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import Dashboard from './pages/Dashboard'
import Movie from './pages/Movie'

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/dashboard" exact element={<Dashboard/>}/>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/movie/:id" exact element={<Movie/>}/>
        </Routes>
    </Router>
  );
}

export default App;
