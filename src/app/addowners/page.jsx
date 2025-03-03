"use client";

import Layout from "../components/Layout";
import Caption from "../components/Caption";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";


const DynamicForm = dynamic(() => import("../components/DynamicForm"), {
  ssr: false, 
});

export default function AddOwners() {

  
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [isClient, setIsClient] = useState(false)
  
  
    useEffect(() => {
      setLoading(false); 
      setIsClient(true);
    }, []);
  
    const fields = [
      
      { name: "d_image",  type: "file", required: true,  demoFileUrl: "/assets/demo_excel/demo.xlsx", }
  
    ];


  return (
    <Layout>
      <main id="main" className="main">
<section className="section">
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Import Owners</h5>
          
 {!isClient ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            <CircularProgress />
          </div>
        ) : (
          <DynamicForm fields={fields} />
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
