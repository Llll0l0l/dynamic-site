const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");

const uuid = require("uuid");


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render('index');
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/confirm", (req, res) => {
    res.render('confirm');
});

app.get("/recommend", (req, res) => {
    res.render('recommend');
});

app.get("/restaurants", (req, res) => {
    const filePath = path.join(__dirname, "data", "restaurants.json");

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render('restaurants', { numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants });
});

app.get('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    const filePath = path.join(__dirname, "data", "restaurants.json");

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId) {
            return res.render('restaurant-detail', { restaurant: restaurant });

        }
    }

    res.render('404');

});


app.post("/recommend", (req, res) => {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const filePath = path.join(__dirname, "data", "restaurants.json");

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    res.redirect("/confirm");
});



app.use(function(req, res) {
    res.render('404');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});