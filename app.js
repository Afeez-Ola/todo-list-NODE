// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

// const items = ['Drink Coffee', 'Buy fye', 'Do Dishes'];
// const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todo-listDB", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const itemSchema = {
    name: String,
};

const Item = mongoose.model("Item", itemSchema);

app.get("/", function(req, res) {
    Item.find({}, (err, result) => {
        // if (err) { console.log(err) }
        console.log(err);
        console.log(result);
    });
});






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




app.listen(process.env.PORT || 3001, function() {
    console.log(`Local: http://localhost:3000`);
});