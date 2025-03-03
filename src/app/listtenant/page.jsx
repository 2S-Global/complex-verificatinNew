"use client";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
//import StickyHeadTable from "../components/ListTable";


// ✅ Dynamically Import DataTable (Client-Side Only)
const DataTable = dynamic(() => import("../components/DataTable"), {
  ssr: false, // ✅ Prevents SSR, avoiding hydration mismatch
});

const fields = [
  { name: "id", label: "ID" },
  { name: "name", label: "Name" },
  { name: "phone", label: "Phone Number" },
  { name: "type", label: "Type" },
];

const data = [
  { id: 1, name: "John Doe", phone: "8697744701", type: "Car Driver" },
  { id: 2, name: "Jane Doe", phone: "8697744709", type: "Maid" },
  ...Array.from({ length: 100 }, (_, i) => ({
    id: i + 3,
    name: `User ${i + 3}`,
    phone: `869774470${i + 3}`,
    type: `Maid`,
  })),
];


export default function ListDomesticUsers() {

const [isMounted, setIsMounted] = useState(false);

// ✅ Wait until mounted to prevent SSR mismatch
useEffect(() => {
setIsMounted(true);
}, []);

  return (
    <Layout><main id="main" className="main">
<section className="section">
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">All Tenants</h5>
          
          {/* ✅ Show loader until mounted to prevent mismatch */}
          {!isMounted ? (
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
