"use client";
import Link from "next/link";
import Layout from "../components/Layout";
import Caption from "../components/Caption";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { usePayment } from "../context/PaymentContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const DynamicForm = dynamic(() => import("../components/DynamicForm"), {
  ssr: false, 
});

export default function PaymentCard() {

  
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [isClient, setIsClient] = useState(false)
    const [users, setUsers] = useState([]);
    const { amount,selectedVerifications  } = usePayment();
    
    const router = useRouter();
    useEffect(() => {
      fetchUsers();
      setLoading(false); 

      setIsClient(true);
        fetchUsers();
    }, []);


    const formatDOB = (dob) => {
      if (!dob) return "";
      
      const date = new Date(dob);
      
      // Extracting Day, Month, and Year
      const day = String(date.getDate()).padStart(2, "0"); // Ensures 2-digit day
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensures 2-digit month
      const year = date.getFullYear(); // 4-digit year
    
      return `${day}-${month}-${year}`; // ✅ Returns "DD-MM-YYYY"
    };
    

    const triggerVerificationAPIs = async (user) => {
      try {
        const verificationTypes = user.selected_verifications.split(", ");
  
        for (const verificationType of verificationTypes) {
          let response;
          switch (verificationType) {
            // case "PAN":
            //   response = await axios.post("https://complex-verification-api.onrender.com/api/verify/varifyPAN", {
            //     customer_pan_number: user.pan,
            //     pan_holder_name: user.pan_holder_name,
            //     userId: user._id,
            //   });
            //   console.log(`PAN Verification for ${user.full_name}:`, response.data);
           
            //   break;
  
            // case "Aadhaar":
            //   response = await axios.post("https://complex-verification-api.onrender.com/api/verify/verifyAadhaar", {
          
            //     customer_aadhaar_number: user.aadhaar,
            //     userId: user._id,

            //   });
            //   console.log(`Aadhaar Verification for ${user.full_name}:`, response.data);
            //   break;
  
            // case "EPIC":
            //   response = await axios.post("https://complex-verification-api.onrender.com/api/verify/varifyEPIC", {
            //     userId: user._id,
            //     customer_epic_number: user.epic,
            //     name_to_match: user.epic_holder_name,
       
            //   });
            //   console.log(`EPIC Verification for ${user.full_name}:`, response.data);
            //   break;
  
            // case "Driving Licence":
            //   const formattedDOB = formatDOB(user.attendent_dob);
            //   // console.log(formattedDOB);
            //   response = await axios.post("https://complex-verification-api.onrender.com/api/verify/verifyDL", {
            //     userId: user._id,
            //     customer_dl_number: user.driving_licence,
            //     name_to_match: user.driving_licence_holder_name,
            //     customer_dob: formattedDOB,
            //   });
            //   console.log(`Driving Licence Verification for ${user.full_name}:`, response.data);
            //   break;
  
            default:
              console.warn(`Unknown verification type: ${verificationType}`);
          }
        }

      } catch (error) {
        console.error(`Error triggering verification APIs for ${user.full_name}:`, error);
      }
    };


    const fetchUsers = async () => {
      try {
        const response = await axios.post("https://complex-verification-api.onrender.com/api/domestic/getDomesticUsersPending", {
          complex_id: 1,
        });
  
        // console.log("Fetched Users:", response.data.users);
        setUsers(response.data.users);
  
        // Process users one by one
        for (const user of response.data.users) {
     
          console.log(user);
          
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
 
    
      if (users.length > 0) {
        // Wait for all API calls to complete before navigation
        await Promise.all(users.map((user) => triggerVerificationAPIs(user)));
    
        // Navigate to another page after completion
        router.push("/lisdomesticusers");
      } else {
        console.warn("No users available for verification.");
      }
    };




  return (
    <Layout>
      <main id="main" className="main" style={{ padding: "3% 20%" }}>

<section className="section">
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
        <h5 className="card-title" >Input Your Card Details</h5>

        <form className="row g-3" onSubmit={handleSubmit} noValidate>
  <div className="col-md-12">
    <div className="form-floating">
      <input type="text" className="form-control" id="floatingName" placeholder="Your Name" required/>
      <label htmlFor="floatingName">Card Holder Name</label>
    </div>
  </div>
  <div className="col-md-6">
    <div className="form-floating">
      <input type="text" className="form-control" id="floatingEmail" placeholder="Your Email" maxLength={16} required/>
      <label htmlFor="floatingEmail">Card Number</label>
    </div>
  </div>
  <div className="col-md-3">
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required maxLength={4}/>
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
    <button type="submit" className="btn btn-primary">
                        Pay Now (INR {amount})
                      </button>&nbsp;&nbsp;
    
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
