const User = require('./User.js');

//Acá aplicamos Programación Orientada a Objetos. Usamos herencia (extends) para que el Administrativo herede las propiedades básicas de la clase User (id, nombre, email, password).
class Administrativo extends User {
    constructor(id, name, email, password, rol, area) {
        // 'super' llama al constructor de la clase padre (User)
        super(id, name, email, password);

        // Agregamos las propiedades únicas de un Administrativo
        this.rol = rol;   // Ej: 'SuperAdmin', 'Direccion'
        this.area = area; // Ej: 'Dirección Académica', 'Inscripciones'
    }
}

module.exports = Administrativo;