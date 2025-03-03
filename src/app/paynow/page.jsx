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

export default function PayNow() {

  
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
      <main id="main" className="main">
<section className="section">
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">Payment Details</h5>


        <table className="table table-striped">
        <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Image</th>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th scope="col">Mobile Number</th>
        <th scope="col">Pay For</th>
        <th scope="col">Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <th scope="row">1</th>
        <td><img src="assets/img/messages-1.jpg"  style={{ width: "50px", height: "50px", borderRadius: "10px" }} alt="" /></td>
        <td>Avik Ghosh</td>
        <td>Driver</td>
        <td>8697744701</td>
        <td>PAN</td>
        <td>50 INR</td>
        </tr>
        <tr>
        <th scope="row">2</th>
        <td><img src="assets/img/messages-2.jpg"  style={{ width: "50px", height: "50px", borderRadius: "10px" }} alt="" /></td>
        <td>Souvik Basu</td>
        <td>Driver</td>
        <td>8697755643</td>
        <td>AADHAAR</td>
        <td>50 INR</td>
        </tr>
        <tr>
        <th scope="row">3</th>
        <td><img src="assets/img/messages-3.jpg"  style={{ width: "50px", height: "50px", borderRadius: "10px" }} alt="" /></td>
        <td>Sayan Mondol</td>
        <td>Maid</td>
        <td>9876677890</td>
        <td>PAN, AADHAAR, DL</td>
        <td>150 INR</td>
        </tr>

        <tr>
        <td colspan="6" style={{ textAlign: "right" }}>Sub-Total : </td>
        <td>150 INR</td>
        </tr>
        <tr>
        <td colspan="6" style={{ textAlign: "right" }}>GST : </td>
        <td>27 INR</td>
        </tr>   

        <tr>
        <td colspan="6" style={{ textAlign: "right" }}>Total : </td>
        <td>177 INR</td>
        </tr>      
        </tbody>
        </table>
      <p style={{ textAlign: "right" }}><Link href="./paymentcard"><button type="button" class="btn btn-success">Pay Now (177 INR)</button></Link></p>
        </div>
      </div>
    </div>
  </div>
</section>
</main>
</Layout>
  );
}
