import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Activity from 'App/Models/Activity'
import Report from 'App/Models/Report'
import User from 'App/Models/User'

export default class ViewsController {
    public async index ({ view }: HttpContextContract) {
        return view.render('index')
    }

    public async login ({ view }: HttpContextContract) {
        return view.render('login')
    }

    public async register ({ view }: HttpContextContract) {
        return view.render('register')
    }

    // Admin Views Controller
    public async admin ({ view, request, auth, response }: HttpContextContract) {
        const user = await auth.use('web').authenticate()
        if (user.authority != "Admin") {
            return response.redirect('/dashboard/user')
        }
        const username = request.qs().username
        if (!username) {
            const activity = await Activity.all()
            return view.render('admin/index', { activity: activity })
        } else {
            const activity = await Activity.query().where('userName', username)
            return view.render('admin/index', { activity: activity })
        }
    }

    public async listUsers ({ view, request, auth, response }: HttpContextContract) {
        const user = await auth.use('web').authenticate()
        if (user.authority != "Admin") {
            return response.redirect('/dashboard/user')
        }
        const username = request.qs().username
        if (!username) {
            const user = await User.all()
            return view.render('admin/listUsers', { user: user })
        } else {
            const user = await User.query().where('username', username)
            return view.render('admin/listUsers', { user: user })
        }
    }

    public async items ({ view, auth, response }: HttpContextContract) {
        const user = await auth.use('web').authenticate()
        if (user.authority != "Admin") {
            return response.redirect('/dashboard/user')
        }
        return view.render('admin/items')
    }

    public async reports ({ view, request, auth, response }: HttpContextContract) {
        const user = await auth.use('web').authenticate()
        if (user.authority != "Admin") {
            return response.redirect('/dashboard/user')
        }
        const name = request.qs().name
        if (!name) {
            const report = await Report.all()
            return view.render('admin/reports', { report: report })
        } else {
            const report = await Report.query().where('name', name)
            return view.render('admin/reports', { report: report })
        }
        
    }

    public async adminProfile ({ view, auth, response }: HttpContextContract) {
        const user = await auth.use('web').authenticate()
        if (user.authority != "Admin" ) {
            return response.redirect('/dashboard/user')
        } else {
            return view.render('admin/profile', { user: user })
        }
    }

    public async adminRegister ({ view }: HttpContextContract) {
        return view.render('admin/admin')
    }

    // User Views Controller
    public async user ({ view, auth }: HttpContextContract) {
        const user = await auth.use('web').authenticate()
        const dataUser = user;
        const idr = parseInt(user.count) * 1000;
        const userActivity = await Activity.query().where('userId', user.id)
        return view.render('user/index', { user: dataUser, idr: idr, activity: userActivity })
    }

    public async profile ({ view, auth }: HttpContextContract) {
        const user = await auth.use('web').authenticate()
        return view.render('user/profile', { user: user })
    }

    public async invest ({ view, auth }: HttpContextContract) {
        const user = await auth.use('web').authenticate();
        const idr = parseInt(user.count) * 1000;
        return view.render('user/invest', { user: user, idr: idr})
    }

    public async store ({ view }: HttpContextContract) {
        return view.render('user/store')
    }

    public async activity ({ view, auth }: HttpContextContract) {
        const user = await auth.use('web').authenticate()
        const userActivity = await Activity.query().where('userId', user.id)
        return view.render('user/activity', { activity: userActivity })
    }

    public async report ({ view, auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        return view.render('user/report')
    }
}
