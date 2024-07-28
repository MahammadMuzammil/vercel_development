const express = require('express')
const app = express()
const path = require('path')
const dbPath = path.join(__dirname, "user.db")
const cors = require('cors')
const { open } = require('sqlite')
const sqlite3 = require('sqlite3')
const jwt = require('jsonwebtoken')
const { request } = require('http')
let db
app.use(cors())
const initializeDBServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }

}
initializeDBServer()
app.use(express.json())
app.listen(3000)

app.get('/',(req,res)=>{
res.send('Hello!!')
})

app.post('/login', async (request, response) => {
    let { username, password } = request.body
    let selectQuery = `select * from user where name = '${username}';`
    let dbResult = await db.get(selectQuery)
    if (dbResult !== undefined) {
        let Userpassword = dbResult.password === password
        if (Userpassword) {
            let payload = { username: username }
            let jwtToken = jwt.sign(payload, 'MY_SECRET_KEY')
            response.json({ status_code: 200, message: 'Login Successful', jwt_token: jwtToken })
        } else {

            response.json({ err_msg: "*User name and Password Doesn't match", status_code: 401 })
        }
    } else {
        response.json({ err_msg: "*User doesn't Exist", status_code: 400 })
    }

})

app.post('/register', async (request, response) => {
    let { username, password } = request.body
    let selectQuery = `select * from user where name = '${username}' ;`
    let dbResult = await db.get(selectQuery)
    if (dbResult !== undefined) {
        response.json({ status_code: 400, message: "User Already Exist's" })
    } else {

        let addUserQuery = `insert into user (name,password,prime)values('${username}','${password}',${false});`
        await db.run(addUserQuery)
        response.json({ status_code: 200, message: 'Registration Successful' })
    }

})

app.post('/movie', async (request, response) => {
    let { movie_name, movie_imgurl, link, reviews, category, language
    } = request.body
    let addMovieQuery = `insert into movie (movie_name, movie_imgurl, link, reviews, category, language) values ('${movie_name}','${movie_imgurl}','${link}',${reviews},'${category}','${language}');`
    await db.run(addMovieQuery)
    response.json({ msg: 'Movie Added Successfully!!' })
})

app.get('/movies', async (request, response) => {
    let { category, language, search_input } = request.query
    let selectQuery
    if (search_input !== '') {
        selectQuery = `select * from movie where movie_name like "%${search_input}%" ;`
    } else {

        selectQuery = `select * from movie where category like '%${category}%' and language = '${language}' ;`
    }

    console.log(request.query)
    console.log(selectQuery)
    let dbResult = await db.all(selectQuery)
    console.log(dbResult)
    response.json({ movies_data: dbResult })

})
