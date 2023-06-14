const { User } = require("../../models")

class UserGameController {
    static getAll = async(req, res) => {
        const listofUerGames = await User.findAll();
        console.log(listofUerGames);

        // res.send(listofUerGames);


        return listofUerGames

    }

    static create = async(req, res) => {

        const { username, email, password, role } = req.body

        const users = await User.create({ username, email, password, role });
        console.log(users);

        return res.redirect('/usergame');

    }

    static update = async(req, res) => {

        const { username, email, password } = req.body
        const { id } = req.params

        const users = await User.update({ username, email, password }, { where: { id } });
        console.log(users);

        // return res.json(users);
        return res.redirect('/update-user/:id');
    }

    static delete = async(req, res) => {

        const { id } = req.params

        const users = await User.destroy({ where: { id } });
        console.log(users);

        return res.redirect('/usergame')
    }

    static showUser = async(req, res) => {
        const result = await this.getAll()
        console.log(result)
        return res.render('usergame', {
            data: result
        })



    }

}

module.exports = UserGameController