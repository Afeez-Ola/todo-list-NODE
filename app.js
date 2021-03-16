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

const item1 = new Item({
    name: 'Praying',

})
const item2 = new Item({
    name: 'Eating',

})
const item3 = new Item({
    name: 'Dancing',

})

const defaultItem = [item1, item2, item3]

// Item.insertMany(defaultItem, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('====================================');
//         console.log('Items Successfully added to the DB');
//         console.log('====================================');
//     }
// })

app.get("/", function(req, res) {
    Item.find({}, (err, result) => {
        if (result.length === 0) {
            Item.insertMany(defaultItem, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('====================================');
                    console.log('Items Successfully added to the DB');
                    console.log('====================================');
                }
            })
            res.redirect('/');
        } else {
            console.log('====================================');
            console.log('SUCCESS!');
            console.log('====================================');
            res.render("list", { listTitle: 'Today', newTasks: result });
        }


    });
});





// })
app.post('/', (req, res) => {

    let itemName = req.body.newItem;

    const item = new Item({
        name: itemName
    })

    console.log(item)

    item.save();

    res.redirect('/')


})

app.post('/delete', (req, res) => {
    console.log(req.body.checkbox);

    let itemId = req.body.checkbox

    Item.findByIdAndRemove(itemId, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('====================================');
            console.log('Item successfully deleted! ');
            console.log('====================================');
        }
    })
    res.redirect('/')
});


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




app.listen(process.env.PORT || 3000, function() {
    console.log(`Local: http://localhost:3000`);
});