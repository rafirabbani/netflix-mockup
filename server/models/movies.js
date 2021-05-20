const movies = (sequelize, DataTypes) => {
  const Movies = sequelize.define('movies', {
    movie_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    movie_tmdb: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    movie_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    movie_view: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    movie_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    movie_episode: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    movie_director: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    movie_casts: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    movie_studio: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    movie_status: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    movie_duration: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    movie_release: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    movie_country: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    movie_genre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    movie_network: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    movie_trailer: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    movie_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    movie_image_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'movies',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "movies_pkey",
        unique: true,
        fields: [
          { name: "movie_id" },
        ]
      },
    ]
  });
  Movies.associate = models => {
    Movies.hasMany(models.Casts, { foreignKey: 'cast_movie_id', onDelete: 'CASCADE' });
    Movies.hasMany(models.Comments, { foreignKey: 'comment_movie_id', onDelete: 'CASCADE' })
  };
  /* Movies.associate = models => {
    Movies.hasMany(models.Comments, { foreignKey: 'comment_movie_id', onDelete: 'CASCADE' })
  } */
  return Movies
};

export default movies
