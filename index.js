const express = require('express');
const app = express();
const UserModel = require('./models/User');
const CohorteModel = require('./models/Cohorte');
const MateriaModel = require('./models/Materia');
const AlumnoModel = require('./models/Alumno');
const PORT = 3000;
const userController = require('./Controllers/userController');
const cohorteController = require('./Controllers/cohorteController');
const materiaController = require('./Controllers/materiaController');
const alumnoController = require('./Controllers/alumnoController');
const administrativoController = require('./Controllers/administrativoController');
const periodoInscripcionController = require('./Controllers/periodoinscripcionController');
const correlatividadController = require('./Controllers/correlatividadController');
const historialAcademicoController = require('./Controllers/historialAcademicoController');
app.use(express.json());

// Configuración del motor de vistas (Pug)
// Acá le decimos a Express que nuestra capa de presentación va a ser renderizada en el servidor usando Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware personalizado (Logger global)
function logger(req, res, next) {
    console.log("Ruta solicitada:", req.url, "- Método:", req.method);
    next(); // Fundamental para que la petición siga su camino
}
app.use(logger);

// Middleware para leer datos de formularios HTML
app.use(express.urlencoded({ extended: true }));

//ROUTES 
//ADMINISTRATIVO
const administrativoRoutes = require('./routes/administrativo.routes');

//Usuario
app.get('/getUsers', userController.getUsers);
app.get('/getUserById/:id', userController.getUserById);
app.post('/createUser', userController.createUser);
app.put('/updateUser/:id', userController.updateUser);
app.delete('/deleteUser/:id', userController.deleteUser);
//Cohorte
app.get('/getCohortes', cohorteController.getCohortes);
app.get('/getCohorteById/:id', cohorteController.getCohorteById);
app.post('/crearCohorte', cohorteController.createCohorte);
app.put('/updateCohorte/:id', cohorteController.updateCohorte);
app.delete('/deleteCohorte/:id', cohorteController.deleteCohorte);
app.post('/cohorte/:cohorteId/addUser', cohorteController.addUserToCohorte);
//Materia
app.get('/api/materias', materiaController.getMaterias);
app.get('/api/materias/:id', materiaController.getMateriaById);
app.post('/api/materias', materiaController.createMateria);
app.put('/api/materias/:id', materiaController.updateMateria);
app.delete('/api/materias/:id', materiaController.deleteMateria);
// Alumno
app.get('/getAlumnos', alumnoController.getAlumnos);
app.get('/getAlumnoById/:id', alumnoController.getAlumnoById);
app.post('/createAlumno', alumnoController.createAlumno);
app.put('/updateAlumno/:id', alumnoController.updateAlumno);
app.delete('/deleteAlumno/:id', alumnoController.deleteAlumno);

// Administrativo
// Esta es la puerta de entrada a nuestro módulo. Cualquier petición web que empiece con /api/administrativos se delega a nuestro archivo de rutas
app.use('/api/administrativos', administrativoRoutes);

// Períodos de Inscripción
app.get('/api/periodos-inscripcion', periodoInscripcionController.getPeriodos);
    // ¡ADVERTENCIA! Las rutas más específicas (como /activos) siempre van ANTES que las que usan parámetros dinámicos (como /:id)
app.get('/api/periodos-inscripcion/activos', periodoInscripcionController.getPeriodosActivos);
app.get('/api/periodos-inscripcion/:id', periodoInscripcionController.getPeriodoById);
app.post('/api/periodos-inscripcion', periodoInscripcionController.createPeriodo);
app.put('/api/periodos-inscripcion/:id', periodoInscripcionController.updatePeriodo);
app.delete('/api/periodos-inscripcion/:id', periodoInscripcionController.deletePeriodo);
// Correlatividades
app.get('/api/correlatividades', correlatividadController.getCorrelatividades);
app.get('/api/correlatividades/materia/:materiaId', correlatividadController.getRequisitosByMateria);
app.get('/api/correlatividades/:id', correlatividadController.getCorrelatividadById);
app.post('/api/correlatividades', correlatividadController.createCorrelatividad);
app.put('/api/correlatividades/:id', correlatividadController.updateCorrelatividad);
app.delete('/api/correlatividades/:id', correlatividadController.deleteCorrelatividad);
// Historial Académico
app.get('/api/historial', historialAcademicoController.getHistorial);
app.get('/api/historial/alumno/:alumnoId', historialAcademicoController.getHistorialByAlumno);
app.post('/api/historial', historialAcademicoController.createRegistro);
app.put('/api/historial/:id', historialAcademicoController.updateRegistro);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});