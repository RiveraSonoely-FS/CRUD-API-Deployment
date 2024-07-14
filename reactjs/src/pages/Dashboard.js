import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    title: '',
    director: '',
    year: ''
  });

  const API_BASE = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api/v1'
    : process.env.REACT_APP_BASE_URL;

  const getMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/movies`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      setError(error.message || 'Unexpected Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [API_BASE]);

  const createMovie = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/movies/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      setValues({ title: '', director: '', year: '' });
      await getMovies();
    } catch (error) {
      setError(error.message || 'Unexpected Error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMovie();
  };

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
        <Link to="/" className="App-link">Home</Link>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              <Link to={`/movie/${movie._id}`} className="App-link">{movie.title}</Link>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <label>
            Title: <space/>
            <input
              type="text"
              name="title"
              className="App-textbox"
              value={values.title}
              onChange={handleInputChanges}
            />
          </label>
          <br/> <br/>
          <label>
            Director: <space/>
            <input
              type="text"
              name="director"
              className="App-textbox"
              value={values.director}
              onChange={handleInputChanges}
            />
          </label>
          <br/> <br/>
          <label>
            Year: <space/>
            <input
              type="text"
              name="year"
              className="App-textbox"
              value={values.year}
              onChange={handleInputChanges}
            />
          </label>
          <br/> <br/>
          <input type="submit" value="Submit" className="App-btn" />
        </form>
      </header>
    </div>
  );
}

export default Dashboard;
