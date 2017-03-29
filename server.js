// https://zellwk.com/blog/crud-express-mongodb/

console.log('May Node be with you')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs')

const MongoClient = require('mongodb').MongoClient

var db
var uri ='mongodb://DynamicVision:Seagull@cluster0-shard-00-00-g8q6t.mongodb.net:27017,cluster0-shard-00-01-g8q6t.mongodb.net:27017,cluster0-shard-00-02-g8q6t.mongodb.net:27017/crud?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

MongoClient.connect(uri, (err, database) => {
	// Start the server
	if (err) return console.log(err)
	db = database
	app.listen(3000, () => {
		console.log('listening on 3000')
	})
})

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	// console.log(__dirname)
	// res.send(__dirname)
	// res.sendFile(__dirname + '/index.html')
	db.collection('quotes').find().toArray(function(err, result) {
		if (err) return console.log(err)
		res.render('index.ejs', { quotes: result})
		console.log(result)
	})
})

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('Save to database')
		res.redirect('/')
	})
	console.log(req.body)
})

