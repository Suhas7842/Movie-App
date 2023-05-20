import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
const uri = `mongodb://rsuhaskumar3:eBq0ozlRy0BmSkFR@ac-ao1jaxv-shard-00-00.x8oqelx.mongodb.net:27017,ac-ao1jaxv-shard-00-01.x8oqelx.mongodb.net:27017,ac-ao1jaxv-shard-00-02.x8oqelx.mongodb.net:27017/?ssl=true&replicaSet=atlas-8lnlua-shard-0&authSource=admin&retryWrites=true&w=majority`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client =>{
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})