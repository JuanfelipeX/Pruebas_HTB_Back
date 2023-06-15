const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.js');


// Obtener la lista completa de usuarios
router.get('/', (req, res) => {
  Movie.findAll()
    .then((movie) => {
      res.json(movie);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener la lista de las Peliculas' });
    });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { title, resume, director, publication_date } = req.body;

  Movie.create({ title, resume, director, publication_date })
    .then((movie) => {
      res.json(movie);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al crear una nueva Pelicula' });
    });
});


// Obtener los detalles de un usuario específico
router.get('/:id', (req, res) => {
  const movieId = req.params.id;

  Movie.findByPk(movieId)
    .then((movie) => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).json({ error: 'Pelicula no encontrada' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los detalles de la Pelicula' });
    });
});

// Actualizar los detalles de un usuario específico
router.put('/:id', (req, res) => {
  const movieId = req.params.id;
  const { title, resume, director, publication_date } = req.body;

  Movie.findByPk(movieId)
    .then((movie) => {
      if (movie) {
        movie.title = title;
        movie.resume = resume;
        movie.director = director;
        movie.publication_date = publication_date;
        return movie.save();
      } else {
        res.status(404).json({ error: 'Pelicula no encontrado' });
      }
    })
    .then((updatedMovie) => {
      res.json(updatedMovie);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al actualizar los detalles de la Pelicula' });
    });
});

// Eliminar un usuario específico
router.delete('/:id', (req, res) => {
  const movieId = req.params.id;

  Movie.findByPk(movieId)
    .then((movie) => {
      if (movie) {
        return movie.destroy();
      } else {
        res.status(404).json({ error: 'Pelicula no encontrado' });
      }
    })
    .then(() => {
      res.json({ message: 'Pelicula eliminada correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar la pelicula' });
    });
});




module.exports = router;
