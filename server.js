const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

var mongoose = require('mongoose')
const { Schema } = mongoose;


// connects database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (!err) console.log('MongoDB has connected successfully.');
});

// creates Schema
const Person = new Schema({
  username: String,
  description: [String],
  duration: [String],
  date: [String],
  count: Number
})
var Model = mongoose.model('person', Person)

// links to html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// user story 1
app.post('/api/exercise/new-user', (req, res) => {
  console.log(JSON.stringify(req.body))

  let person = new Model({
    username: req.body.username
  })

  person.save((err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      res.json({ 'username': req.body.username, 'id': data._id })
    }
  })
})


// user story 2
app.get('/api/exercise/users', (req, res) => {
  Model.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})


// user story 3
app.post('/api/exercise/add', (req, res) => {

  if (req.body.date == '') {
    req.body.date = new Date()
  }

  console.log(JSON.stringify(req.body))

  Model.findById({ _id: req.body.userId }, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      data.description.push(req.body.description)
      data.date.push(req.body.date)
      data.duration.push(req.body.duration)
      data.count = data.duration.length
      res.json({ 'username': data.username, 'id': data._id, 'description': req.body.description, 'duration': req.body.duration, 'date': req.body.date, 'count': data.count })
      data.save((err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log(data)
        }
      })
    }
  })
})


// user story 4
app.post('/api/exercise/log', (req, res) => {
  Model.findById({ _id: req.body.userId }, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      // res.json({ 'username': data.username, 'id': data._id, 'description': data.description, 'duration': data.duration, 'date': data.date, 'count': data.count })
      res.json(data)
    }
  })
})


// user story 5
app.get('/api/exercise/log/:user/:date', (req, res) => {
  Model.find({ _id: req.params.user, date: req.params.date }, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

app.get('/exercise/log', (req, res) => {
  const { userid, from, to, limit } = req.query
  // let findDate = Date.parse(data.date)
  let fromDate = Date.parse(from)
  let toDate = Date.parse(to)
  let limited = parseInt(limit)
  // console.log(fromDate)
  // console.log(toDate)

  Model.find({ _id: userid }, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let bools = false
      let fin = []
      fin.push({ 'userId': userid })
      for (let i = 0; i < data[0].date.length; i++) {
        let arr = []
        let dataParsed = Date.parse(data[0].date[i])
        // arr.push(dataParsed)
        if (dataParsed >= fromDate && dataParsed <= toDate) {
          // console.log(data[0].description[i])
          arr.push(data[0].description[i])
          arr.push(data[0].date[i])
          arr.push(data[0].duration[i])
          // console.log(arr)
          bools = true
        }
        fin.push(arr)
      }
      if (bools) {
        // console.log(typeof limited)
        res.json(fin.slice(0, (limited + 1)))
      } else {
        res.json(data)
      }
      // console.log(Date.parse(data[0].date[0]))
      // console.log(Date.parse(data[0].date[1]))
    }

  })

  // if does not meet from and to, return full user info
  // else loop thru user info to find from and to dates, return log info

})


app.use(cors())

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
