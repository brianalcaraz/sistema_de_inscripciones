import express from 'express';
import UserModel from './models/User.js';
import CohorteModel from './models/Cohorte.js';
import MateriaModel from './models/Materia.js';
import AlumnoModel from './models/Alumno.js';
import userController from './Controllers/userController.js';
import cohorteController from './Controllers/cohorteController.js';
import materiaController from './Controllers/materiaController.js';
import alumnoController from './Controllers/alumnoController.js';
import administrativoController from './Controllers/administrativoController.js';
import periodoInscripcionController from './Controllers/periodoinscripcionController.js';
import correlatividadController from './Controllers/correlatividadController.js';
import historialAcademicoController from './Controllers/historialAcademicoController.js';
import administrativoRoutes from './routes/administrativo.routes.js';

const PORT = 3000;
const app = express();

app.use(express.json());

// Configuración del motor de vistas (Pug)
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware personalizado (Logger global)
const logger = (req, res, next) => {
    console.log("Ruta solicitada:", req.url, "- Método:", req.method);
    next();
};
app.use(logger);

// Middleware para leer datos de formularios HTML
app.use(express.urlencoded({ extended: true }));

// ROUTES
// Usuario
app.get('/getUsers', userController.getUsers);
app.get('/getUserById/:id', userController.getUserById);
app.post('/createUser', userController.createUser);
app.put('/updateUser/:id', userController.updateUser);
app.delete('/deleteUser/:id', userController.deleteUser);

// Cohorte
app.get('/getCohortes', cohorteController.getCohortes);
app.get('/getCohorteById/:id', cohorteController.getCohorteById);
app.post('/crearCohorte', cohorteController.createCohorte);
app.put('/updateCohorte/:id', cohorteController.updateCohorte);
app.delete('/deleteCohorte/:id', cohorteController.deleteCohorte);
app.post('/cohorte/:cohorteId/addUser', cohorteController.addUserToCohorte);

// Materia
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
app.use('/api/administrativos', administrativoRoutes);

// Períodos de Inscripción
app.get('/api/periodos-inscripcion', periodoInscripcionController.getPeriodos);
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