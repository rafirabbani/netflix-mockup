import users from './users';
import movies from './movies';
import casts from './casts';
import comments from './comments';
import Sequelize from 'sequelize';
import { sequelize } from '../../config/config-db';

const models = {
    Users: users(sequelize, Sequelize),
    Movies: movies(sequelize, Sequelize),
    Casts: casts(sequelize, Sequelize),
    Comments: comments(sequelize, Sequelize),
}

//4. create relation OneToMany | ManyToMany
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

// 5. export sequalize agar bisa di-call di module lain
export default models;