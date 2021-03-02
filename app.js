// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.set('view engine', 'ejs');

// const items = ['Drink Coffee', 'Buy fye', 'Do Dishes'];
// const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(
    'mongodb://localhost:27017/todo-listDB', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

const itemSchema = {
    name: String
};

const Item = mongoose.model('Item', itemSchema)

const item1 = new Item({
    name: 'Eating Sand'
})
const item2 = new Item({
    name: 'Playing PES'
})
const item3 = new Item({
    name: 'Praying '
})

const defaultItem = [item1, item2, item3];

Item.insertMany(defaultItem, function(err) {
    if (err) {
        console.log(err);
    } else {

        mongoose.connection.close();
        console.log('SUCCESS!');
    }
})

Item.find({}, (err, result) => {
    // console.log(result);
    console.log('====================================');
    console.log(result);
    console.log('====================================');
})

app.get('/', function(req, res) {
    Item.find({}, (err, result) => {
        // if (err) { console.log(err) }
        console.log(err);
        console.log(result)
    })
})




// app.get('/', (req, res) => {
//     Item.find({}, (err, newTasks) => {

//         console.log(newTasks);
//         res.render('list', { listTitle: 'Today', newTasks: newTasks });

//     })

//     // res.render('list', { listTitle: 'Today', newTasks: items })
// })
app.post('/', (req, res) => {

    const item = req.body.newTask

    if (req.body.list === 'Work') {
        workItems.push(item)
        res.redirect('/work')
    } else {
        items.push(item)
        res.redirect('/')
    }

})


app.get('/work', (req, res) => {
    res.render('list', { listTitle: 'Work List', newTasks: workItems })
})

app.post('/work', (req, res) => {
    const item = req.body.newTask;
    workItems.push(item)
    res.redirect('/work')
})


app.get('/about', (req, res) => {
    res.render('about')
})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`We are live at port ${PORT}`)
})