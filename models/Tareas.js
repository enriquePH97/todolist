var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TareaSchema = new Schema({
    nombre    : 'String'
  , hecho : 'String'
  , pos : 'Number'
});
module.exports = mongoose.model('tarea', TareaSchema);