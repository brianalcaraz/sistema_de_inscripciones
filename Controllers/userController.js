import User from '../models/User.js';

let listaUsuario = [
    { id: 1, name: "Juan Pérez",    email: "juan.perez@example.com",   password: "password123" },
    { id: 2, name: "María García",  email: "maria.garcia@example.com", password: "password456" },
    { id: 3, name: "Carlos López",  email: "carlos.lopez@example.com", password: "password789" }
];

const getUsers = (req, res) => {
    const usuariosSinPassword = listaUsuario.map(({ id, name, email }) => ({ id, name, email }));
    res.json({ message: 'Lista de usuarios', data: usuariosSinPassword });
};

const getUserById = (req, res) => {
    const { id } = req.params;
    const usuario = listaUsuario.find(u => u.id === parseInt(id));
    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const { password, ...usuarioSinPassword } = usuario;
    res.json({ message: `Detalles del usuario con ID: ${id}`, user: usuarioSinPassword });
};

const createUser = (req, res) => {
    const { id, name, email, password } = req.body;
    if (!id || !name || !email || !password) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const nuevoUsuario = new User(id, name, email, password);
    listaUsuario.push(nuevoUsuario);
    res.json({ message: 'Usuario creado exitosamente', user: nuevoUsuario });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const usuario = listaUsuario.find(u => u.id === parseInt(id));
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    if (name) usuario.name = name;
    if (email) usuario.email = email;
    if (password) usuario.password = password;

    res.json({ message: "Usuario actualizado", user: usuario });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    const index = listaUsuario.findIndex(u => u.id === parseInt(id));
    if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

    const eliminado = listaUsuario.splice(index, 1);
    res.json({ message: "Usuario eliminado", user: eliminado });
};

export default { 
    getUsers,
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
};