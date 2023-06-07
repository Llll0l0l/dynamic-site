const path = require('path');
const fs = require('fs');
const { get } = require('http');

const filePath = path.join(__dirname, "..", "data", "restaurants.json");


function getStoredRestaurants() {

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants
}


function storeRestaurants(restaurantsToBeStored) {
    fs.writeFileSync(filePath, JSON.stringify(restaurantsToBeStored));

}


module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants: storeRestaurants

};