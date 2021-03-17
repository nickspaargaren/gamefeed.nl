import { server } from '../../config';
const app = require('express')()

var cron = require('node-cron');
const fetch = require('node-fetch');

var MongoClient = require('mongodb').MongoClient


cron.schedule('* * * * *', () => {
  console.log('running a task every minute');


  MongoClient.connect(process.env.MONGODBURL, (err, client) => {
    if (err) throw err

    var db = client.db('main')


    fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.APIKEYGOOGLE}&channelId=UCjBp_7RuDBUYbd1LegWEJ8g&part=snippet,id&order=date&maxResults=20`)
    .then(response => response.json())
    .then(data => {
      // console.log(data)

      data.items.map((item, index) =>  { 
        const query = { title: item.snippet.title };
        const update = { $set: { title: item.snippet.title, description: item.snippet.description, etag: data.etag, image: item.snippet.thumbnails.default.url, videoId: item.id.videoId, channel: item.snippet.channelTitle, publishedAt: item.snippet.publishedAt }};
        const options = { upsert: true };

        return (
          db.collection('feed').updateOne(query, update, options)
        )
      })


      // log updaten
      db.collection('log').insertOne(
        { feed: "xbox", etag: "BTMUwOpUrva3_ln-f9Sp3dzpLiY", ts: Date.now(), server: `${server}` }
      )
      
    })
    .catch(err => console.log(err))

  })

})






app.get('/api', (req, res) => {

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

})

module.exports = app