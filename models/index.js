"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var basename  = path.basename(module.filename);
var config    = require('config');

var sequelize = new Sequelize(config.get('db.uri'), {
  logging : console.log,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

//Fix datatype level validation
Sequelize.STRING.prototype.validate = function() { return true; };
Sequelize.INTEGER.prototype.validate = function() { return true; };
Sequelize.DECIMAL.prototype.validate = function() { return true; };
Sequelize.TEXT.prototype.validate = function() { return true; };
Sequelize.BOOLEAN.prototype.validate = function() { return true; };

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log("Database: Setup Done");

module.exports = db;
