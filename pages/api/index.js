var MongoClient = require('mongodb').MongoClient

const feed = (req, res) => {
  
  MongoClient.connect(process.env.MONGODBURL, (err, client) => {
    if (err) throw err

    var db = client.db('main')
    db.collection('feed').find().sort({ publishedAt: -1 }).toArray((err, result) => {
      if (err) throw err
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
      res.json(result)
    })

  })
}

export default feed