import Alumno from '../models/Alumno.js';

let listaAlumnos = [
    new Alumno(101, 'Ana Torres',  'ana.torres@example.com',  'pass101', 'L101', true,  new Date('2023-03-01')),
    new Alumno(102, 'Luis Gomez',  'luis.gomez@example.com',  'pass102', 'L102', true,  new Date('2023-03-02')),
    new Alumno(103, 'Sofia Diaz',  'sofia.diaz@example.com',  'pass103', 'L103', false, new Date('2022-08-15'))
];

// Helper para omitir la contraseña en las respuestas
const omitPassword = (alumno) => {
    const { password, ...alumnoSinPassword } = alumno;
    return alumnoSinPassword;
};

const getAlumnos = (req, res) => {
    const alumnosSinPassword = listaAlumnos.map(omitPassword);
    res.json({ message: 'Lista de alumnos', data: alumnosSinPassword });
};

const getAlumnoById = (req, res) => {
    const { id } = req.params;
    const alumno = listaAlumnos.find(a => a.id === parseInt(id));
    if (!alumno) {
        return res.status(404).json({ error: "Alumno no encontrado" });
    }
    res.json({ message: `Detalles del alumno con ID: ${id}`, data: omitPassword(alumno) });
};

const createAlumno = (req, res) => {
    const { id, name, email, password, legajo, activo, fecha_inscripcion } = req.body;

    if (!id || !name || !email || !password || !legajo || activo === undefined || !fecha_inscripcion) {
        return res.status(400).json({ error: "Faltan datos obligatorios (id, name, email, password, legajo, activo, fecha_inscripcion)" });
    }

    const nuevoAlumno = new Alumno(id, name, email, password, legajo, activo, new Date(fecha_inscripcion));
    listaAlumnos.push(nuevoAlumno);

    res.status(201).json({ message: 'Alumno creado exitosamente', data: omitPassword(nuevoAlumno) });
};

const updateAlumno = (req, res) => {
    const { id } = req.params;
    const { name, email, password, legajo, activo, fecha_inscripcion } = req.body;

    const alumno = listaAlumnos.find(a => a.id === parseInt(id));
    if (!alumno) {
        return res.status(404).json({ error: "Alumno no encontrado" });
    }

    if (name) alumno.name = name;
    if (email) alumno.email = email;
    if (password) alumno.password = password;
    if (legajo) alumno.legajo = legajo;
    if (activo !== undefined) alumno.activo = activo;
    if (fecha_inscripcion) alumno.fecha_inscripcion = new Date(fecha_inscripcion);

    res.json({ message: "Alumno actualizado", data: omitPassword(alumno) });
};

const deleteAlumno = (req, res) => {
    const { id } = req.params;
    const index = listaAlumnos.findIndex(a => a.id === parseInt(id));
    if (index === -1) return res.status(404).json({ error: "Alumno no encontrado" });

    const [eliminado] = listaAlumnos.splice(index, 1);
    res.json({ message: "Alumno eliminado", data: omitPassword(eliminado) });
};

export { listaAlumnos };
export default { 
    getAlumnos, 
    getAlumnoById, 
    createAlumno, 
    updateAlumno, 
    deleteAlumno 
};