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