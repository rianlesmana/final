/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'ViewsController.index')
Route.get('/login', 'ViewsController.login')
Route.get('/register', 'ViewsController.register')
Route.get('/dashboard/admin', 'ViewsController.admin')
Route.get('/dashboard/user', 'ViewsController.user')
Route.get('/dashboard/user/profile', 'ViewsController.profile')
Route.get('/dashboard/user/invest', 'ViewsController.invest')
Route.get('/dashboard/user/store', 'ViewsController.store')
Route.get('/dashboard/user/activity', 'ViewsController.activity')
Route.get('/dashboard/user/report', 'ViewsController.report')
Route.get('/dashboard/admin/users', 'ViewsController.listUsers')
Route.get('/dashboard/admin/items', 'ViewsController.items')
Route.get('/dashboard/admin/reports', 'ViewsController.reports')
Route.get('/dashboard/admin/profile', 'ViewsController.adminProfile')
Route.get('/admin/register/123456789', 'ViewsController.adminRegister')


// Post Route
Route.post('/register', 'PostsController.register')
Route.post('/login', 'PostsController.login')
Route.get('/logout', 'PostsController.logout')
Route.post('/activity', 'PostsController.invest')
Route.post('/activity/update/:id', 'PostsController.updateActivity')
Route.post('/user/update/:id', 'PostsController.updateUser')
Route.post('/admin/update/:id', 'PostsController.updateAdmin')
Route.post('/report', 'PostsController.report')
Route.get('/user/delete/:id', 'PostsController.deleteUser')