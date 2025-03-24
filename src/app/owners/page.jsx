"use client";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
import axios from "axios";

// ✅ Dynamically Import DataTable (Client-Side Only)
const DataTable = dynamic(() => import("../components/DataTable"), {
  ssr: false, // ✅ Prevents SSR, avoiding hydration mismatch
});

const fields = [
  { name: "id", label: "ID" },
  { name: "name", label: "Name" },
  { name: "flat", label: "Flat No." },
  { name: "phone", label: "Phone Number" },
];

export default function Owners() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // ✅ Ensure loading state before request

      try {
        const response = await axios.post(
          "https://complex-verification-api.onrender.com/api/owners/getOwners",
          { complex_id: "1" },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.data || response.data.length === 0) {
          throw new Error("No data received");
        }

        const formattedData = response.data.map((owner, index) => ({
          id: index + 1,
          name: owner.name,
          phone: owner.phone,
          flat: owner.flat_number,
        }));

        setData(formattedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch owners");
      } finally {
        setLoading(false); // ✅ Stop loading after fetching
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <main id="main" className="main">
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">All Owners</h5>

                  {/* ✅ Show loader while fetching */}
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
                  ) : error ? (
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                  ) : data && data.length > 0 ? (
                    <DataTable fields={fields} data={data} />
                  ) : (
                    <p style={{ textAlign: "center" }}>No owners found.</p>
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
