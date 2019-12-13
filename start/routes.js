'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.post('staff/perfil', 'Staff/PerfilController.show')
Route.post('staff/editarPerfil', 'Staff/PerfilController.update')
Route.post('staff/excluirPerfil', 'Staff/PerfilController.destroy')
Route.post('loginStudent', 'Alunos/LoginController.login').validator('Main/Login')
Route.post('login', 'Main/LoginController.login').validator('Main/Login')
Route.post('staff/registration', 'Staff/RegistrationController.store').validator('Staff/Registration')
Route.post('main/welcome', 'Main/SendMailController.WelcomeMail')
Route.get('users/activation/:token/:email', 'Main/SendMailController.ActivateMail')
Route.post('/staff/lista/alunos', 'Staff/AlunosstaffController.show')
Route.post('/staff/cadastro/aluno', 'Staff/AlunosstaffController.store')
Route.get('/staff/lista/equipamentos', 'Staff/EquipamentoController.index')
Route.get('/staff/lista/categorias', 'Staff/EquipamentoController.indexCategoria')
Route.post('student/profile', 'Alunos/PerfilController.show')
Route.get('/staff/lista/exercicio', 'Staff/ExerciseController.index')
Route.get('/alunos/ativacao/:chaveAcesso/:email', 'Staff/AlunosstaffController.studentActivation')
Route.post('/staff/aluno/cadastrar', 'Staff/AlunosstaffController.store').middleware('auth').validator('Staff/staffStudents')
Route.post('/teste', 'Staff/AlunosstaffController.store').middleware('auth').validator('Staff/staffStudents')
Route.post('/testeemail', 'Main/SendMailController.testeemail')
Route.post('/studentImcHistory', 'Staff/ImcController.getIMCs')
Route.post('/scheduleStudent', 'Alunos/TrainingController.show')
Route.post('staffTrainings', 'Staff/TreinoController.show')
Route.post('staff/pagamento', 'Staff/PaymentController.store')
Route.post('/studentProfileEdit', 'Alunos/PerfilController.update')
Route.post('/testemercadopago', 'mercadopago/PaymentController.payment')
Route.post('/students/registration', 'Alunos/RegistrationController.store')
Route.post('/imcHistory', 'Alunos/ImcController.getIMCs')