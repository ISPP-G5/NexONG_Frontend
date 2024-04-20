import React,{useState, useEffect} from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom';
import PaymentForm from './PaymentForm';



const stripePromise = loadStripe("pk_test_51Ox9TCRpBIltZJvdVpeyhYgZ0jAsrJQP9pqMF5jCsjH6a8206YtvpPhP0a8MJ6RkchORFhicVJwZ4zV1tcq2rz8B003Klymf2d");
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const Checkout = () => {
   
    const [clientsecret, setClientSecret]=useState('')
    const {prod_id}=useParams();
    console.log(prod_id)
    useEffect(()=>{
        fetch(`${API_ENDPOINT}punctual-donation-by-card/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prod_id),
          })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [])
    
    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret:clientsecret
      };

      

     
  return (
    <div className='container'>
        {clientsecret && (
        <Elements  stripe={stripePromise} options={options}>
             <PaymentForm/>
        </Elements>
      )}
    </div>
  )
}

export default Checkout