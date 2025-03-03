"use client";

import Layout from "../components/Layout";
import Caption from "../components/Caption";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";


const DynamicForm = dynamic(() => import("../components/DynamicForm"), {
  ssr: false, 
});

export default function AddDomesticUser() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [isClient, setIsClient] = useState(false)


  useEffect(() => {
    setLoading(false); 
    setIsClient(true);
  }, []);

  const fields = [
    { name: "apartment", label: "Apartment No", type: "select", required: true, sm: 6, options: [
        { value: "AB", label: "AB" },
        { value: "BC", label: "BC" },
        { value: "CA", label: "CA" },
      ],
    },
    { name: "name", label: "Name of Owner", required: true, type: "text", sm: 6 },
    { type: "caption", text: "TENANT", sm: 12 },
    { name: "a_name", label: "Tenant Name", required: true, type: "text", sm: 4 },
    
    { name: "gender", label: "Gender", type: "radio", required: true, sm: 4, options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  { name: "dob", label: "Date of Birth", required: true, type: "text", sm: 4 },
    { name: "number", label: "Phone Number", required: true, type: "text", sm: 6 },
    { name: "image",  type: "file", required: true,sm: 6  },


    { name: "address", label: "Address", required: true, type: "textarea", sm: 12 },
    { type: "caption", text: "PAN", sm: 12 },
    { name: "p_no", label: "Pan Number", required: true, type: "text", sm: 4 },
    { name: "p_hold", label: "Name of the Pan Holder", required: true, type: "text", sm: 4 },
    { name: "p_image",  type: "file", required: true,sm: 4  },
    { type: "caption", text: "AADHAAR", sm: 12 },
    { name: "aadhaar_no", label: "Aadhaar Number",  type: "text", sm: 4 },
    { name: "aadhaar_name", label: "Name of the Aadhaar Holder",  type: "text", sm: 4 },
    { name: "a_image",  type: "file", sm: 4  },
    { type: "caption", text: "EPIC", sm: 12 },
    { name: "epic_no", label: "Epic Number",  type: "text", sm: 4 },
    { name: "epic_name", label: "Name of the Epic Holder",  type: "text", sm: 4 },
    { name: "e_image",  type: "file", sm: 4  },
    { type: "caption", text: "DRIVING LICENSE", sm: 12 },
    { name: "dl_no", label: "DL No",  type: "text", sm: 4 },
    { name: "DL_name", label: "Name of the DL Holder",  type: "text", sm: 4 },
    { name: "d_image",  type: "file", sm: 4  },

  ];



  return (
    <Layout>
      <main id="main" className="main">
<section className="section">
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add Tenant</h5>
          
          {!isClient ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            <CircularProgress />
          </div>
        ) : (
          <DynamicForm fields={fields}   submitButtonText="Submit Now"/>
        )}

        </div>
      </div>
    </div>
  </div>
</section>
</main>
</Layout>
  );
}
