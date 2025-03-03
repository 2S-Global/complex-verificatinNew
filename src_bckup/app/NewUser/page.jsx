"use client";

import Layout from "../components/Layout";
import Caption from "../components/Caption";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";


const DynamicForm = dynamic(() => import("../components/DynamicForm"), {
  ssr: false, 
});

export default function NewForm() {
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
    { type: "caption", text: "ATTENDANT", sm: 12 },
    { name: "a_name", label: "Attendant Name", required: true, type: "text", sm: 4 },
    
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
    { name: "aadhaar_no", label: "Aadhaar Number", required: true, type: "text", sm: 4 },
    { name: "aadhaar_name", label: "Name of the Aadhaar Holder", required: true, type: "text", sm: 4 },
    { name: "a_image",  type: "file", required: true,sm: 4  },
    { type: "caption", text: "EPIC", sm: 12 },
    { name: "epic_no", label: "Epic Number", required: true, type: "text", sm: 4 },
    { name: "epic_name", label: "Name of the Epic Holder", required: true, type: "text", sm: 4 },
    { name: "e_image",  type: "file", required: true,sm: 4  },
    { type: "caption", text: "DRIVING LICENSE", sm: 12 },
    { name: "dl_no", label: "DL No", required: true, type: "text", sm: 4 },
    { name: "DL_name", label: "Name of the DL Holder", required: true, type: "text", sm: 4 },
    { name: "d_image",  type: "file", required: true,sm: 4  },

  ];



  return (
    <Layout>
      <main id="main" className="main">
        {!isClient ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            <CircularProgress />
          </div>
        ) : (
          <DynamicForm fields={fields}   submitButtonText="Register"/>
        )}
      </main>
    </Layout>
  );
}
