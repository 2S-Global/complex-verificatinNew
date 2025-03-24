"use client";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";
//import StickyHeadTable from "../components/ListTable";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CheckCircle, Cancel, RemoveCircleOutline } from "@mui/icons-material";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router


// ✅ Dynamically Import DataTable (Client-Side Only)
const DataTable = dynamic(() => import("../components/DataTable"), {
  ssr: false, // ✅ Prevents SSR, avoiding hydration mismatch
});




const fields = [
  { name: "id", label: "Sl No",minWidth: 80, },

  { name: "full_name", label: "Owner Name" },
  {name: "attendent_image",label: "Attendent Image"},
  { name: "attendent_name", label: "Attendent Name" },
  // { name: "attendent_gender", label: "Gender" },
  { name: "attendent_phone", label: "Phone" },
  {
    name: "pan_verify",
    label: "Pan Verify",
    render: (value) => getStatusIcon(value),
  },
  {
    name: "aadhaar_verify",
    label: "Aadhaar Verify",
    render: (value) => getStatusIcon(value),
  },
  {
    name: "epic_verify",
    label: "Epic Verify",
    render: (value) => getStatusIcon(value),
  },
  {
    name: "dl_verify",
    label: "DL Verify",
    render: (value) => getStatusIcon(value),
  },
  { 
    name: "action", 
    label: "Action", 
    minWidth: 100, 
    icon: <VisibilityIcon color="primary" /> 
  },
];
const getStatusIcon = (status) => {
  console.log("Status for icon:", status); // ✅ Debugging status values
  if (status === "verified") return <CheckCircle sx={{ color: "green" }} />;
  if (status === "not_verified") return <Cancel sx={{ color: "red" }} />;
  return <RemoveCircleOutline sx={{ color: "gray" }} />;
};




export default function ListDomesticUsers() {

  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

// ✅ Wait until mounted to prevent SSR mismatch
const router = useRouter(); 

useEffect(() => {
  setIsMounted(true);
  
  fetchUsers();
  }, []);

  const handleViewDetails = (id) => {
    router.push(`/domesticpreview/${id}`); // ✅ Redirect to another page with the ID
  };

  

  const getVerificationStatus = (response) => {
    if (!response) return "not_checked"; // Default if no response
    if (response.success && response.response_code === "100") return "verified";
    if (response.response_code === "101") return "not_verified";
    return "unknown";
  };
  
  // ✅ Function to get verification icon based on status

const fetchUsers = async () => {
  try {
      const response = await axios.post("https://complex-verification-api.onrender.com/api/domestic/getDomesticUsersVerified", {
          complex_id: "1",
      });

      console.log("Processed Users Data:", response.data); 
      // 🛠 Make sure response follows expected format
      const users = response.data?.map((user, index) => ({
          id: index + 1,  
          full_name: user.full_name,
          attendent_image: user.attendent_image,
          attendent_name: user.attendent_name ,
          attendent_gender: user.attendent_gender ,
          attendent_phone: user.attendent_phone ,
          pan_verify: getStatusIcon(getVerificationStatus(user.pan_response)),
          aadhaar_verify: getStatusIcon(getVerificationStatus(user.aadhaar_response)),
          epic_verify: getStatusIcon(getVerificationStatus(user.epic_response)),
          dl_verify: getStatusIcon(getVerificationStatus(user.dl_response)),
          action:  user._id , 


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
                    <DataTable fields={fields} data={data} handleViewDetails={handleViewDetails} />
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
