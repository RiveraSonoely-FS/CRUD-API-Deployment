import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function Movie() {
  const [values, setValues] = useState({
    title: '',
    director: ''
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
          director: data.director
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
        <h5>{values.title}</h5>
        <p>{values.director}</p>
        <button onClick={deleteMovie}>Delete Movie</button>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Director:
            <input
              type="text"
              name="director"
              value={values.director}
              onChange={handleInputChanges}
            />
          </label>
          <input type="submit" value="Submit" className="btn" />
        </form>
      </header>
    </div>
  );
}

export default Movie;
