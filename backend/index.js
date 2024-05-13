const cors=require("cors");
const express=require("express");
const stripe=require("stripe")("sk_test_51PFx47SJRlGEPJpxlMXKPmlUVbK7yxuj0P2fsUJOuZKIc7ehMpoFIwFF7HJ7ChRIz4NAuPktXJMqUVkR4871MT7e00YqTKKBvo");
const uuid=require("uuid");

const app=express();


//middleware
app.use(express.json());
app.use(cors());


//routes
app.get("/",(req,res)=>{
    res.send("IT WORKS");
})


app.post("/payment", (req,res)=>{
    const {product,token}=req.body;
    console.log("PRODUCT", product);
    console.log("PRODUCT-PRICE", product.price);
    const idempotencyKey=uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:product.price*100,
            currency:'inr',
            customer:customer.id,
            recipient_email: token.email,
            description: `purchase of ${product.name}`,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }
    },{idempotencyKey})
})
.then(result=> res.status(200).json(result))
.catch(err => console.log(err));
});

//listen
app.listen(8282, ()=>{
    console.log("LISTENING AT PORT 8282");
})