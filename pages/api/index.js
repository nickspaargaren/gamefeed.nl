const app = require('express')()

app.get('/api', (req, res) => {

  var MongoClient = require('mongodb').MongoClient

  MongoClient.connect(process.env.MONGODBURL, (err, client) => {
    if (err) throw err

    var db = client.db('main')

    db.collection('feed').find().toArray(function (err, result) {
      if (err) throw err
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
        res.json(result)
    })
  })

})

module.exports = app