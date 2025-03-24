"use client";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
//import StickyHeadTable from "../components/ListTable";
import axios from "axios";

// ✅ Dynamically Import DataTable (Client-Side Only)
const DataTable = dynamic(() => import("../components/DataTable"), {
  ssr: false, // ✅ Prevents SSR, avoiding hydration mismatch
});

const fields = [
  { name: "id", label: "Sl No" },

  { name: "full_name", label: "Owner Name" },
  {
  name: "attendent_image",label: "Attendent Image",
},

  { name: "attendent_name", label: "Attendent Name" },
  { name: "attendent_gender", label: "Gender" },
  { name: "attendent_phone", label: "Phone" },
];





export default function ListDomesticUsers() {

  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

// ✅ Wait until mounted to prevent SSR mismatch
useEffect(() => {
setIsMounted(true);

fetchUsers();
}, []);


const fetchUsers = async () => {
  try {
      const response = await axios.post("https://complex-verification-api.onrender.com/api/domestic/getDomesticUsersVerified", {
          complex_id: "1",
      });

      // 🛠 Make sure response follows expected format
      const users = response.data?.map((user, index) => ({
          id: index + 1,  
          full_name: user.full_name,
          attendent_image: user.attendent_image,
          attendent_name: user.attendent_name ,
          attendent_gender: user.attendent_gender ,
          attendent_phone: user.attendent_phone ,

      })) || [];

      setData(users);
  } catch (error) {
      console.error("Error fetching users:", error);




  } finally {
      setLoading(false);
  }
};

  return (
    <Layout><main id="main" className="main">
<section className="section">
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">All Domestic Users</h5>
          
          {loading || !isMounted ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100px",
                      }}
                    >
                      <CircularProgress />
                    </div>
                  ) : (
                    <DataTable fields={fields} data={data} />
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
