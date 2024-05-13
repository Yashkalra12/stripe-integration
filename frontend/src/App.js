import logo from './logo.svg';
import './App.css';
import React , {useCallback, useState} from 'react';
import StripeCheckout from "react-stripe-checkout";

function App() {

  const [Product,setProduct]=useState({
    name:"ProVersion",
    price: 999,
    productBy: "RecipeHub-Pro"

  })


  const makePayment= token =>{
    const body={
      token,
      Product
    }
    const headers={
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:8282/payment`, {
      method:"POST",
      headers,
      body:JSON.stringify(body)

    }).then(response =>{
      console.log("RESPONSE", response);
      const {status} =response;
      console.log("STATUS", status);
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout 
        stripeKey="pk_test_51PFx47SJRlGEPJpxwRwnGMCu04OoVz2TKHuxiYTwLGEhhZogxkA3EFzjwacyznS3r0nonLk4D2DXsbnptfUcOs2700ue2Zd3MW"
        token={makePayment}
        name="Get Started"
        amount={Product.price*100}>
          <button className='btn-large dark-yellow'>Get Started Buy ProVersion</button>  
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
