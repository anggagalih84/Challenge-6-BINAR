const express = require('express')
const app = express()
const model = require('./models')
const fs = require('fs')
const UserGameController = require('./controller/user_game/user_game_controller')
const port = 3010

app.set('view engine', 'ejs') //memanggil ejs
app.use(express.static('public')) //memanggil folder file (public)
    // app.set('views', './views') //set view ejs 
const usersRead = fs.readFileSync('./public/data/user.json');
const users = JSON.parse(usersRead);

app.use(express.urlencoded({ extended: false }));
app.use(express.json()) // membaca json
app.get('/', (req, res) => res.render('project')) //masuk ke halaman utama
app.get('/game', (req, res) => res.render('project-4')) // masuk ke halaman ke dua
app.get('/home', (req, res) => res.render('project')) // kembali ke halaman pertama 
app.get('/login', (req, res) => res.render('login'))
app.get('/userbiodata', (req, res) => res.render('userbiodata'))
app.get('/userhistory', (req, res) => res.render('userhistory'))
app.get('/create', (req, res) => res.render('create'))
app.get('/update-user/:id', (req, res) => res.render('update'))


app.post('/login', (req, res) => {
    console.log("succes", req.body)
    const username = req.body.username
    const pass = req.body.password

    const userGet = users.find(userGet => userGet.username === username && userGet.password === pass)
    if (userGet) {
        res.status(200).json({ message: "Login Berhasil, Have Fun!" });
    } else {
        res.status(401).json({ message: "Login Gagal, yuk bisa yuk" });

    }

})

app.get("/api", UserGameController.getAll)
app.post("/create-user", UserGameController.create)
app.post("/update-user/:id", UserGameController.update)
app.get("/delete-user/:id", UserGameController.delete)
app.get('/usergame', UserGameController.showUser)


app.listen(3010, () => { //running dashboard
    console.log('Dashboard running at http://localhost:3010')
});