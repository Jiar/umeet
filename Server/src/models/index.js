'use strict';

import fs  from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

let basename = path.basename(module.filename);

class Models {
    
    constructor(config) {
        this.sequelize = new Sequelize(config.database, config.username, config.password, config.options);
        this.Sequelize = Sequelize;
        this.imports();
    }

    imports() {
        let db = {}
        let modelFiles = fs.readdirSync(__dirname)
            .filter(function(file) {
                return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'); 
            });
        for(let modelFile of modelFiles) {
            let model = this.sequelize["import"](path.join(__dirname, modelFile));
            db[model.name] = model;
        }
        for(let modelName in db) {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
            this[modelName] = db[modelName];
        }
    }

}

export default Models
