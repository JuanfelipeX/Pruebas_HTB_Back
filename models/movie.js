const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('prueba_htb', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
  },
  publication_date: {
    type: DataTypes.STRING,
  },
});

Movie.sync()
  .then(() => {
    console.log('Modelo de Pelicula sincronizado correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo de Peliculas:', error);
  });

module.exports = Movie;
