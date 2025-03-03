"use client";
import Link from "next/link";
import Layout from "../components/Layout";
import Caption from "../components/Caption";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";


const DynamicForm = dynamic(() => import("../components/DynamicForm"), {
  ssr: false, 
});

export default function PaymentCard() {

  
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [isClient, setIsClient] = useState(false)
  
  
    useEffect(() => {
      setLoading(false); 
      setIsClient(true);
    }, []);
  
    const fields = [
      
      { name: "d_image",  type: "file", required: true}
  
    ];


  return (
    <Layout>
      <main id="main" className="main" style={{ padding: "3% 20%" }}>

<section className="section">
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">Input Your Card Details</h5>

        <form className="row g-3" >
  <div className="col-md-12">
    <div className="form-floating">
      <input type="text" className="form-control" id="floatingName" placeholder="Your Name" />
      <label htmlFor="floatingName">Card Holder Name</label>
    </div>
  </div>
  <div className="col-md-6">
    <div className="form-floating">
      <input type="email" className="form-control" id="floatingEmail" placeholder="Your Email" />
      <label htmlFor="floatingEmail">Card Number</label>
    </div>
  </div>
  <div className="col-md-3">
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
      <label htmlFor="floatingPassword">Expiry Date</label>
    </div>
  </div>
  <div className="col-md-3">
    <div className="col-md-12">
      <div className="form-floating">
        <input type="text" className="form-control" id="floatingCity" placeholder="City" />
        <label htmlFor="floatingCity">CVV</label>
      </div>
    </div>
  </div>
  
  <div className="text-center">
  <Link href="./download"><button type="submit" className="btn btn-primary">
      Pay Now (INR 177)
    </button></Link>&nbsp;&nbsp;
    
    <Link href="./paynow"><button type="reset" className="btn btn-secondary">
      Back
    </button></Link>
  </div>
</form>


        </div>
      </div>
    </div>
  </div>
</section>
</main>
</Layout>
  );
}
