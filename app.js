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

});
const item2 = new Item({
    name: 'Eating',

});
const item3 = new Item({
    name: 'Dancing',

});

const defaultItem = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model('List', listSchema);

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

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === 'Today') {
        console.log(`this is item: ${item}`)
        item.save();
        res.redirect('/');
    } else {
        List.findOne({ name: listName }, function(err, result) {
            console.log(`this is listName: ${listName}`);
            // result.items.push(item);
            console.log(`This is result: ${result.items}`);
            // result.items.push(item)
            // result.save();
            // res.redirect('/' + listName);

        });
    }

});

app.post('/delete', (req, res) => {


    const itemId = req.body.checkbox;

    Item.findByIdAndRemove(itemId, (err) => {
        if (!err) {
            console.log('Items successfully deleted!');
            console.log(itemId);
            res.redirect('/');
        }
    });

});


app.get('/:paramName', (req, res) => {
    const paramName = req.params.paramName;

    List.findOne({ name: paramName }, (err, result) => {
        if (!err) {
            if (!result) {

                const list = new List({
                    name: paramName,
                    items: defaultItem
                });

                list.save();
                res.redirect('/' + paramName);

            } else {
                console.log('name exists!');
                res.render('list', { listTitle: result.name, newTasks: result.items })
            }
        }
    });
});
// const list = new List({
//     name: paramName,
//     items: defaultItem
// });

// list.save();


// app.get('/work', (req, res) => {
//     res.render('list', { listTitle: 'Work List', newTasks: workItems })
// })

// app.post('/work', (req, res) => {
//     const item = req.body.newTask;
//     workItems.push(item)
//     res.redirect('/work')
// })


app.get('/about', (req, res) => {
    res.render('about');
});




app.listen(process.env.PORT || 3000, function() {
    console.log(`Local: http://localhost:3000`);
});