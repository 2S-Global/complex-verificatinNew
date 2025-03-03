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

  useEffect(() => {
    setLoading(false); // Hide loader after mount (avoids SSR mismatch)

    const fetchCountries = async () => {
        try {
          const response = await fetch("https://restcountries.com/v3.1/all");
          const data = await response.json();
  
          // Extract country names
          const countryOptions = data.map((country) => ({
            value: country.cca2, 
            label: country.name.common,
          }));
  
          setCountries(countryOptions);
        } catch (error) {
          console.error("Error fetching country data:", error);
        }
      };
  
      fetchCountries();
  }, []);

  const fields = [
    
    {
        name: "apartment",
        label: "Apartment No",
        type: "select",
        required: true,
        // options: [
        //   { value: "AB", label: "AB" },
        //   { value: "BC", label: "BC" },
        //   { value: "CA", label: "CA" },
        // ],
        options: countries, 
      },
    { name: "name", label: "Name of Owner", required: true, type: "text" },
    { type: "caption", text: "ATTENDANT" }, 
    { name: "a_name", label: "Attendant Name", required: true, type: "text" },
    { name: "number", label: "Phone Number", required: true, type: "text" },
    { name: "address", label: "Address", required: true, type: "textarea" },

    { type: "caption", text: "PAN" }, 

    { name: "p_no", label: "Pan Number", required: true, type: "text" },
    { name: "p_hold", label: "Name of the Pan Holder", required: true, type: "text" },

    { type: "caption", text: "AADHAAR" },
    { name: "aadhaar_no", label: "Aadhaar Number", required: true, type: "text" },
    { name: "aadhaar_name", label: "Name of the Aadhaar Holder", required: true, type: "text" },
    
    { type: "caption", text: "EPIC" },
    { name: "epic_no", label: "Epic Number", required: true, type: "text" },
    { name: "epic_name", label: "Name of the Epic Holder", required: true, type: "text" },

    { type: "caption", text: "DRIVING LICENSE" },
    { name: "dl_no", label: "DL No", required: true, type: "text" },
    { name: "DL_name", label: "Name of the DL Holder", required: true, type: "text" },


  ];



  return (
    <Layout>
      <main id="main" className="main">
        {loading ? (
          // ✅ Show CircularProgress only after hydration
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            <CircularProgress />
          </div>
        ) : (
          <DynamicForm fields={fields}  />
        )}
      </main>
    </Layout>
  );
}
