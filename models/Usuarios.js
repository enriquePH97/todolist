var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    nombre    : 'String',
    pass : 'String',
});

// elimina la key password del objeto que retorna al momento de crear un usuario
UsuarioSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

//agregamos el plugin de validación única
UsuarioSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('usuario', UsuarioSchema);