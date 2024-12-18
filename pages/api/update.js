
import { server } from '../../config';
import channels from '../../data/channels'
var MongoClient = require('mongodb').MongoClient

const update = (req, res) => {

  MongoClient.connect(process.env.MONGODBURL, (err, client) => {
    if (err) throw err

    var db = client.db('main')

    channels.map((channel) => {

      fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.APIKEYGOOGLE}&channelId=${channel.id}&part=snippet,id&order=date&maxResults=20`)
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
          { feed: channel.naam, etag: "BTMUwOpUrva3_ln-f9Sp3dzpLiY", ts: Date.now(), server: `${server}` }
        )
        
      })
      .catch(err => console.log(err))
    })

  })
  res.status(200).json({ status: 'Updated' })
}

export default update