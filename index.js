const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();



const port = process.env.PORT || 5000;
const app = express();


//Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2hlou.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    await client.connect();
    const productCollection = client.db("dbuser1").collection("products");

    app.get('/products', async(req, res) => {
        const result = await productCollection.find({}).toArray();
        res.send(result);
    })
    app.get('/products/:id',async(req, res) => {
        const id = req.params.id;
        const result = await productCollection.findOne({_id: ObjectId(id)});
        res.send(result);
    })
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('E-commerce server in Running');
});

app.listen(port,() => {
    console.log('Server is Running');
})


