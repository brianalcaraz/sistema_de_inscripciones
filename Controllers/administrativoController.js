//Usamos estas librerías nativas de Node.js para interactuar con nuestro archivo JSON, que actúa como persistencia de datos
const fs = require('fs');
const path = require('path');

const Administrativo = require('../models/Administrativo.js');

const rutaArchivo = path.join(__dirname, '../data/administrativos.json');

const leerAdministrativos = () => {
    const datos = fs.readFileSync(rutaArchivo, 'utf-8');
    return JSON.parse(datos);
};

const guardarAdministrativos = (lista) => {
    fs.writeFileSync(rutaArchivo, JSON.stringify(lista, null, 2));
};


//Esto es clave por seguridad. Es una función helper que intercepta el objeto del empleado y le quita la contraseña antes de enviarlo a las vistas o a la API, para que nunca quede expuesta en el navegador
const omitPassword = (admin) => {
    const { password, ...adminSinPassword } = admin;
    return adminSinPassword;
};

// RENDERIZAR VISTAS
//Lee el JSON, filtra las contraseñas con el helper, y usa res.render('administrativos/lista', ...) para inyectar esos datos dentro de la plantilla Pug y devolver el HTML armado.
exports.getAdministrativos = (req, res) => {
    const lista = leerAdministrativos();
    res.render('administrativos/lista', { administrativos: lista.map(omitPassword) });
};

exports.getRegisterForm = (req, res) => {
    res.render('administrativos/registrar');
};

exports.getEditForm = (req, res) => {
    const lista = leerAdministrativos();
    const admin = lista.find(a => a.id === parseInt(req.params.id));
    if (!admin) return res.status(404).send("Administrativo no encontrado");
    
    res.render('administrativos/editar', { admin });
};

// --- PROCESAR DATOS (POST / API) ---

exports.getAdministrativoById = (req, res) => {
    const lista = leerAdministrativos();
    const admin = lista.find(a => a.id === parseInt(req.params.id));
    if (!admin) return res.status(404).json({ error: "Administrativo no encontrado" });

    res.json({ data: omitPassword(admin) });
};

//Recibe los datos del formulario (req.body), instancia un nuevo objeto de la clase Administrativo, lo pushea al array y lo guarda en el disco. La clave acá es el res.redirect('/api/administrativos'), que le dice al navegador que vuelva a cargar la lista para ver el cambio reflejado inmediatamente, completando el ciclo web.
exports.createAdministrativo = (req, res) => {
    const { id, name, email, password, rol, area } = req.body;
    const lista = leerAdministrativos();

    const nuevoAdmin = new Administrativo(parseInt(id), name, email, password, rol, area);
    lista.push(nuevoAdmin);
    guardarAdministrativos(lista);

    // Redirige a la lista
    res.redirect('/api/administrativos');
};

// UPDATE
exports.updateAdministrativo = (req, res) => {
    const lista = leerAdministrativos();
    const index = lista.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send("Administrativo no encontrado");

    const { name, email, password, rol, area } = req.body;

    if (name) lista[index].name = name;
    if (email) lista[index].email = email;
    if (password) lista[index].password = password;
    if (rol) lista[index].rol = rol;
    if (area) lista[index].area = area;

    guardarAdministrativos(lista);

    // Termina de guardar y te manda de vuelta a la pantalla de la lista
    res.redirect('/api/administrativos');
};

// DELETE
exports.deleteAdministrativo = (req, res) => {
    const lista = leerAdministrativos();
    const index = lista.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send("Administrativo no encontrado");

    // Lo saca del array
    lista.splice(index, 1);
    guardarAdministrativos(lista);

    // Termina de borrar y te manda de vuelta a la pantalla de la lista
    res.redirect('/api/administrativos');
};