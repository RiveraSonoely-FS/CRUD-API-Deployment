import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies List</h1>
        <Link to="/dashboard" className="App-link">Dashboard</Link>
      </header>
    </div>
  );
}

export default Home;
