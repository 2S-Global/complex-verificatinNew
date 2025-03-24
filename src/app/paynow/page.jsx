"use client";
import Link from "next/link";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { usePayment } from "../context/PaymentContext";

const DynamicForm = dynamic(() => import("../components/DynamicForm"), {
  ssr: false,
});

export default function PayNow() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ users: [], subtotal: 0, gst: 0, final_price: 0 });
  const { setAmount,setSelectedVerifications  } = usePayment(); 
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.post("https://complex-verification-api.onrender.com/api/domestic/getDomesticUsersPending", {
        complex_id: 1,
      });

      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = () => {
    setAmount(data.final_price); // Store final_price in context
    setSelectedVerifications(data.users.map(user => user.selected_verifications || "N/A"));

  };

  return (
    <Layout>
      <main id="main" className="main">
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Payment Details</h5>

                  {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                      <CircularProgress />
                    </div>
                  ) : (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Image</th>
                          <th scope="col">Name</th>
                          <th scope="col">Type</th>
                          <th scope="col">Mobile Number</th>
                          <th scope="col">Pay For</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.users.length > 0 ? (
                          data.users.map((user, index) => (
                            <tr key={user._id}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                <img
                                  src={user.attendent_image}
                                  style={{ width: "50px", height: "50px", borderRadius: "10px" }}
                        
                                />
                              </td>
                              <td>{user.full_name}</td>
                              <td> {user.type}</td>
                              <td>{user.attendent_phone || "N/A"}</td>
                              <td>{user.selected_verifications || "N/A"}</td>
                              <td>{user.total_verification_amount} INR</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>No data available</td>
                          </tr>
                        )}

                        {/* Summary Fields with Dynamic Values */}
                        <tr>
                          <td colSpan="6" style={{ textAlign: "right" }}>Sub-Total :</td>
                          <td>{data.subtotal} INR</td>
                        </tr>
                        <tr>
                          <td colSpan="6" style={{ textAlign: "right" }}>GST :</td>
                          <td>{data.gst} INR</td>
                        </tr>
                        <tr>
                          <td colSpan="6" style={{ textAlign: "right" }}>Total :</td>
                          <td>{data.final_price} INR</td>
                        </tr>
                      </tbody>
                    </table>
                  )}

                  <p style={{ textAlign: "right" }}>
                    <Link href="./paymentcard">
                      <button type="button" className="btn btn-success"  onClick={handlePayNow}>
                        Pay Now ({data.final_price} INR)
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
