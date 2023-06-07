const express = require("express");
const router = express.Router();

const resData = require("../util/restaurant-data");
const uuid = require("uuid");

router.get("/confirm", (req, res) => {
    res.render("confirm");
});

router.get("/recommend", (req, res) => {
    res.render("recommend");
});

router.get("/restaurants", (req, res) => {
    const storedRestaurants = resData.getStoredRestaurants();
    let order = req.query.order;
    let nextOrder = "desc";


    if (order !== "asc" && order !== "desc") {
        order = "asc";
    }

    if (order === "desc") {
        nextOrder = "asc";
    } else {
        nextOrder = "desc";
    }


    storedRestaurants.sort(function(resA, resB) {
        if (order === "asc") {
            return resA.name > resB.name ? 1 : -1;
        }

        return resA.name < resB.name ? 1 : -1;

    });


    res.render("restaurants", {
        numberOfRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants,
        nextOrder: nextOrder
    });
});

router.get("/restaurants/:id", (req, res) => {
    const restaurantId = req.params.id;

    const storedRestaurants = resData.getStoredRestaurants();

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId) {
            return res.render("restaurant-detail", { restaurant: restaurant });
        }
    }

    res.status(404).render("404");
});

router.post("/recommend", (req, res) => {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.push(restaurant);

    resData.storeRestaurants(storedRestaurants);
    console.log(storedRestaurants);

    res.redirect("/confirm");
});

module.exports = router;