const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Movie = require('../models/movie.js');


// Obtener la lista completa de usuarios
router.get('/', (req, res) => {
  Movie.findAll()
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener la lista de Peliculas' });
    });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { name, email, password, image } = req.body;

  Movie.create({ name, email, password, image })
    .then((Movie) => {
      res.json(Movie);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al crear un Nueva Pelicula' });
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

// Actualizar los detalles de una Pelicula específico
router.put('/:id', (req, res) => {
  const movieId = req.params.id;
  const { name, email, image } = req.body;

  Movie.findByPk(movieId)
    .then((movie) => {
      if (movie) {
        movie.name = name;
        movie.email = email;
        movie.image = image;
        return movie.save();
      } else {
        res.status(404).json({ error: 'Pelicula no encontrada' });
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
        res.status(404).json({ error: 'Pelicula no encontrada' });
      }
    })
    .then(() => {
      res.json({ message: 'Pelicula eliminada correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al eliminar Pelicula' });
    });
});

module.exports = router;
