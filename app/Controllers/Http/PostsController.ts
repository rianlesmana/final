import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Activity from 'App/Models/Activity';
import Report from 'App/Models/Report';
import User from 'App/Models/User';

export default class PostsController {
    public async register({ request, response, session }: HttpContextContract) {
        try {
            const newUser = new User();
            newUser.username = request.input('username');
            newUser.password = request.input('password');
            newUser.fullName = request.input('fullName');
            newUser.birthDate = request.input('birthDate');
            newUser.phoneNumber = request.input('phoneNumber');
            newUser.address = request.input('address');
            newUser.count = request.input('count');
            if (newUser.count === undefined) {
                newUser.count = '0';
            };
            newUser.authority = request.input('authority');
            if (newUser.authority === undefined) {
                newUser.authority = 'Member'
            };
            newUser.about = request.input('about');

            await newUser.save();
            
            session.flash('success', 'Berhasil mendaftar!, silakan untuk masuk!');
            return response.redirect('/login')
        } catch (error) {
            session.flash('error', 'Periksa kembali data anda!');
            return response.redirect('/register')
        }
    }

    public async login({ auth, request, response, session }: HttpContextContract) {
        const username = request.input('username');
        const password = request.input('password');

        try {
            await auth.use('web').attempt(username, password)
            const user = await auth.use('web').authenticate()
            if (user.authority != 'Admin') {
                return response.redirect('/dashboard/user')
            } else {
                return response.redirect('/dashboard/admin')
            }
        } catch (error) {
            session.flash('error', 'Periksa kembali data yang anda masukan!')
            return response.redirect('/login')
        }
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.use('web').logout()
        return response.redirect('/login')
    }

    public async updateUser ({ auth, response, params, request, session }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = params.id
        const userUpdate = await User.findOrFail(id)
        userUpdate.username = request.input('username');
        userUpdate.password = request.input('password');
        userUpdate.fullName = request.input('fullName');
        userUpdate.birthDate = request.input('birthDate');
        userUpdate.phoneNumber = request.input('phoneNumber');
        userUpdate.address = request.input('address');
        userUpdate.count = String(Number(userUpdate.count) + Number(request.input('count')));
        userUpdate.authority = request.input('authority');
        userUpdate.about = request.input('about');
        await userUpdate.save()
        session.flash('success', 'Berhasil memperbarui data pengguna!')
        return response.redirect('/dashboard/user/profile')
    }

    public async updateAdmin ({ auth, response, params, request, session }: HttpContextContract) {
        await auth.use('web').authenticate()
        const id = params.id
        const userUpdate = await User.findOrFail(id)
        userUpdate.username = request.input('username');
        userUpdate.password = request.input('password');
        userUpdate.fullName = request.input('fullName');
        userUpdate.birthDate = request.input('birthDate');
        userUpdate.phoneNumber = request.input('phoneNumber');
        userUpdate.address = request.input('address');
        userUpdate.count = String(parseInt(userUpdate.count) + parseInt(request.input('count')));
        userUpdate.authority = request.input('authority');
        userUpdate.about = request.input('about');
        await userUpdate.save()
        session.flash('success', 'Berhasil memperbarui data pengguna!')
        return response.redirect('/dashboard/admin/users')
    }

    public async invest({ auth, response, request, session }: HttpContextContract) {
        const user = await auth.use('web').authenticate()
        const invest = new Activity()
        invest.userName = user.username
        invest.nameActivity = request.input('nameActivity')
        if (invest.nameActivity === undefined) {
            invest.nameActivity = "tarik tunai";
        }
        invest.unit = request.input('unit')
        if (invest.unit === undefined) {
            invest.unit = "1";
        }
        invest.price = request.input('price')
        invest.totalPrice = String(parseInt(invest.price) * parseInt(invest.unit))
        invest.status = request.input('status')
        if (invest.status === undefined) {
            invest.status = 'on process'
        }
        invest.userId = user.id

        await invest.save()

        session.flash('success', 'Permintaan anda sedang di proses')
        return response.redirect('/dashboard/user/activity')
    }

    public async updateActivity ({ params, request, response }: HttpContextContract) {
        const id = params.id
        const activity = await Activity.findOrFail(id)
        activity.status = request.input('status')
        await activity.save()
        response.redirect('/dashboard/admin')
    }

    public async report ({ request, response }: HttpContextContract) {
        const report = new Report()
        report.name = request.input('name')
        report.report = request.input('report')
        await report.save()
        return response.redirect('/dashboard/admin')

    }

    public async deleteReport ({ params, response }: HttpContextContract) {
        const id = params.id
        const report = await Report.findOrFail(id);
        await report.delete()
        return response.redirect('/dashboard/admin/reports')
    }

    public async deleteUser ({ params, response }: HttpContextContract) {
        const id = params.id
        const user = await User.findOrFail(id)
        await user.delete()
        return response.redirect('/dashboard/admin/users')
    }
}


