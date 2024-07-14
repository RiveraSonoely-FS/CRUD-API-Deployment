import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function Movie() {
  const [values, setValues] = useState({
    title: '',
    director: '',
    year: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const API_BASE = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api/v1'
    : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/movies/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setValues({
          title: data.title,
          director: data.director,
          year: data.year,
        });
      } catch (error) {
        setError(error.message || 'Unexpected Error');
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [API_BASE, id]);

  const deleteMovie = async () => {
    try {
      await fetch(`${API_BASE}/movies/${id}`, {
        method: 'DELETE'
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setError(error.message || 'Unexpected Error');
    } finally {
      setLoading(false);
    }
  };

  const updateMovie = async () => {
    try {
      await fetch(`${API_BASE}/movies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
    } catch (error) {
      setError(error.message || 'Unexpected Error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateMovie();
  };

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Page</h1>
        <h2>{values.title}</h2>
        <h5>{values.director}</h5>
        <h5>{values.year}</h5>
        <button onClick={deleteMovie} className="App-btn">Delete Movie</button>
        <br/> <br/>
        <Link to="/" className="App-link">Home</Link> <space/>
        <Link to="/dashboard" className="App-link">Dashboard</Link> <br/> <br/>

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
              value={values.director}
              onChange={handleInputChanges}
              className="App-textbox"
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

export default Movie;
