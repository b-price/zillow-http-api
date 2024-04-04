const PORT = parseInt(process.argv[2])
if ( PORT < 0 || PORT > 65535 || isNaN(PORT)){
    console.error("Error: invalid port number")
    process.exit()
}

const properties = [
    { price: 240000, city: "baltimore" },
    { price: 300000, city: "austin" },
    { price: 400000, city: "austin" },
    { price: 1000000, city: "seattle"},
    { price: 325000, city: "baltimore" },
    { price: 550000, city: "seattle" },
    { price: 250000, city: "boston" }
]

function getZestimate(sqft, beds, baths){
    return sqft * beds * baths * 10
}

let express = require('express')
let app = express()

app.get('/v1/zillow/zestimate', function (req, res) {
    let sqft = req.query.sqft
    let bed = req.query.bed
    let bath = req.query.bath
    let zestimate = getZestimate(sqft, bed, bath)

    if (!zestimate){
        res.status(404).send("Error: invalid query")
    } else {
        res.status(200).send({"zestimate":zestimate})
    }
})

app.get('/v1/zillow/houses', function (req, res){
    if (req.url.slice(18, 22) !== "city"){
        res.status(404).send("Error: invalid query")
    } else {
        let city = req.query.city
        let houses = []
        for (property of properties){
            if (property.city === city){
                houses.push(property)
            }
        }
        res.status(200).send(houses)
    }
})

app.get('/v1/zillow/prices', function (req, res){
    let price = req.query.price
    if (!price){
        res.status(404).send("Error: invalid price")
    }
    else {
        let houses = []
        for (property of properties){
            if (property.price <= price){
                houses.push(property)
            }
        }
        res.status(200).send(houses)
    }
})

app.listen(PORT)