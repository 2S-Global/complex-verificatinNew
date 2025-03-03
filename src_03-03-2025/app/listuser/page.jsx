"use client"; // ✅ Ensure it's a Client Component

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
import Layout from "../components/Layout";
import axios from "axios";

// ✅ Dynamically Import DataTable (Client-Side Only)
const DataTable = dynamic(() => import("../components/DataTable"), {
  ssr: false, 
});

// ✅ Define Table Fields
const fields = [
  { name: "slNo", label: "Sl. No" },
  { name: "name", label: "Country Name" },
  { name: "capital", label: "Capital" },
  { name: "currency", label: "Currency" },
];

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  
    axios.get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countries = response.data.map((country, index) => ({
          id: index + 1, // ✅ Add a unique ID
          slNo: index + 1, 
          name: country.name.common, 
          capital: country.capital ? country.capital[0] : "N/A",
          currency: country.currencies
            ? Object.values(country.currencies)[0].name
            : "N/A",
        }));
        setData(countries);
      })
      .catch((error) => console.error("Error fetching countries:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <main id="main" className="main">
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">List of Countries</h5>

                  {/* ✅ Show loader until data is loaded */}
                  {loading ? (
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
