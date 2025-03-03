"use client";

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
        <h5 className="card-title">Download Report Details</h5>


        <table className="table table-striped">
        <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Image</th>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th scope="col">Mobile Number</th>
        <th scope="col">PAN</th>
        <th scope="col">AADHAAR</th>
        <th scope="col">EPIC</th>
        <th scope="col">DL</th>
        <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <th scope="row">1</th>
        <td><img src="assets/img/messages-1.jpg"  style={{ width: "50px", height: "50px", borderRadius: "10px" }} alt="" /></td>
        <td>Avik Ghosh</td>
        <td>Driver</td>
        <td>8697744701</td>
        <td><img src="assets/img/tick.png"  style={{ width: "30px", height: "30px", borderRadius: "10px" }} alt="" /></td>
        <td>-</td>
        <td><img src="assets/img/tick.png"  style={{ width: "30px", height: "30px", borderRadius: "10px" }} alt="" /></td>
        <td>-</td>
        <td><i class="bi bi-arrow-down-circle-fill"></i> &nbsp; <i class="bi bi-eye-fill"></i></td>
        </tr>
        <tr>
        <th scope="row">2</th>
        <td><img src="assets/img/messages-2.jpg"  style={{ width: "50px", height: "50px", borderRadius: "10px" }} alt="" /></td>
        <td>Souvik Basu</td>
        <td>Driver</td>
        <td>8697755643</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td><img src="assets/img/tick.png"  style={{ width: "30px", height: "30px", borderRadius: "10px" }} alt="" /></td>
        <td><i class="bi bi-arrow-down-circle-fill"></i> &nbsp; <i class="bi bi-eye-fill"></i></td>
        </tr>
        <tr>
        <th scope="row">3</th>
        <td><img src="assets/img/messages-3.jpg"  style={{ width: "50px", height: "50px", borderRadius: "10px" }} alt="" /></td>
        <td>Sayan Mondol</td>
        <td>Maid</td>
        <td>9876677890</td>
        <td><img src="assets/img/cross.png"  style={{ width: "30px", height: "30px", borderRadius: "10px" }} alt="" /></td>
        <td><img src="assets/img/cross.png"  style={{ width: "30px", height: "30px", borderRadius: "10px" }} alt="" /></td>
        <td>-</td>
        <td>-</td>
        <td><i class="bi bi-arrow-down-circle-fill"></i> &nbsp; <i class="bi bi-eye-fill"></i></td>
        </tr>

        
        </tbody>
        </table>

        </div>
      </div>
    </div>
  </div>
</section>
</main>
</Layout>
  );
}
