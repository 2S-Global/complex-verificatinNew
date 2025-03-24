"use client";

import Layout from "../components/Layout";
import Caption from "../components/Caption";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
const DynamicForm = dynamic(() => import("../components/DynamicForm"), {
  ssr: false, 
});

export default function AddDomesticUser() {
  const [loading, setLoading] = useState(true);

  const [isClient, setIsClient] = useState(false);
  const [apartments, setApartments] = useState([]); 
  const [formValues, setFormValues] = useState({});
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  // const searchParams = useSearchParams();

  const [ownerName, setOwnerName] = useState("");
  const [apartmentOptions, setApartmentOptions] = useState([]);
  const router = useRouter();

  useEffect(() => {

    fetchApartments();

  
    setLoading(false); 
    setIsClient(true);


  }, []);


  const fetchApartments = async () => {
    try {
      const response = await axios.post(
        "https://complex-verification-api.onrender.com/api/owners/getApartments",
        { complex_id: "1" },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.flatNumbers && Array.isArray(response.data.flatNumbers)) {
        const uniqueApartments = [...new Set(response.data.flatNumbers)];
        const options = uniqueApartments.map((apt) => ({
          value: apt,
          label: apt,
        }));

        setApartments(options);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };

  const fetchOwnerName = async (apartment, setFieldValue) => {
    try {
 
      const response = await axios.post(
        "https://complex-verification-api.onrender.com/api/owners/getOwnerByFlat",
        { apartment },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && response.data.owner.name) {
        setFieldValue("full_name", response.data.owner.name);
   
      } else {
        setFieldValue("full_name", "");
      }
    } catch (error) {
      console.error("Error fetching owner name:", error);
      setFieldValue("full_name", "");
    }
  };

  const handleApartmentChange = (apartment, setFieldValue) => {
    setFieldValue("apartment", apartment);
    fetchOwnerName(apartment, setFieldValue);
  };


  const handleFileUpload = async (file, fieldName, setFieldValue) => {
    if (!file) return;
  
    console.log(`Uploading file for ${fieldName}...`);
  
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG, JPEG, and JPG files are allowed.");
      setFieldValue(fieldName, { file: null, uploadedFilename: "" });
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const uploadResponse = await axios.post(
        "https://complex-verification-api.onrender.com/api/domestic/uploadFile",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      console.log("Upload Response:", uploadResponse.data);
  
      if (!uploadResponse.data || !uploadResponse.data.fileName) {
        console.error("Upload failed: No filename returned from API.");
        alert("Error: File upload failed. Please try again.");
        return;
      }
  
      const uploadedFilename = uploadResponse.data.fileName; // ✅ Use `fileName` instead of `filename`
  
      setFieldValue(fieldName, { file, uploadedFilename }); // ✅ Save filename
  
      console.log(`Uploaded ${fieldName}:`, uploadedFilename);
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
      alert(`Error uploading file: ${error.message}`);
    }
  };
  
  
  
  
  
  

  

  // ✅ Handle Form Submission
  const handleSubmit = async (values,actionType) => {
 
    try {
      console.log("Form Data Before Processing:", values);
  
      // ✅ Create a copy of values
      const requestData = { ...values, complex_id: "1" ,status:"0" };
  
      // ✅ Convert file objects to only send uploadedFilename
      Object.keys(requestData).forEach((key) => {
        if (
          requestData[key] &&
          typeof requestData[key] === "object" &&
          requestData[key].uploadedFilename
        ) {
          requestData[key] = requestData[key].uploadedFilename; // ✅ Send only filename
        }
      });
  
      console.log("Final Request Data:", JSON.stringify(requestData, null, 2));
  
      // ✅ Send final form data as JSON
      const response = await axios.post(
        "https://complex-verification-api.onrender.com/api/domestic/createDomesticUser",
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("Server Response:", response.data);
      alert("Form submitted successfully!");


      if (actionType === "add_more") {
        alert("User added! You can add another.");

      
      } else if (actionType === "save_next") {
        alert("User added! Moving to the next step...");
     
        
        router.push("/paynow");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
  
      if (error.response) {
        console.error("Response Data:", error.response.data);
        alert(`Error: ${error.response.status} - ${error.response.data.message || "Request failed"}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Error: No response received from server.");
      } else {
        console.error("Error Message:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  
  









  const fields = [
    { name: "apartment", label: "Apartment No", type: "select", required: true, sm: 4, options: apartments, onChange: handleApartmentChange, },
    { name: "full_name", label: "Name of Owner", required: true, type: "text", sm: 4 , value: ownerName,  readOnly: true },
    { name: "user_type", label: "Type", type: "select", required: true, sm: 4, options: [
      { value: "Driver", label: "Driver" },
      { value: "Maid", label: "Maid" },
      { value: "Gardener", label: "Gardener" },
    ],
  },
    { type: "caption", text: "ATTENDANT", sm: 12 },
    { name: "attendent_name", label: "Attendant Name", required: true, type: "text", sm: 4 },
    
    { name: "attendent_gender", label: "Gender", type: "radio", required: true, sm: 4, options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  { name: "attendent_dob", label: "Date of Birth", required: true, type: "date", sm: 4 },
    { name: "attendent_phone", label: "Phone Number", required: true, type: "text", sm: 6 },
    { name: "attendent_image",  type: "file", required: true,sm: 6  , onChange: (e) => handleFileUpload(e.target.files[0], "attendent_image") },


    { name: "address", label: "Address", required: true, type: "textarea", sm: 12 },
    { type: "caption", text: "PAN", sm: 12 },
    { name: "pan", label: "Pan Number", required: true, type: "text", sm: 4 },
    { name: "pan_holder_name", label: "Name of the Pan Holder", required: true, type: "text", sm: 4 },
    { name: "pan_document",  type: "file", required: true,sm: 4 ,onChange: (e) => handleFileUpload(e.target.files[0], "pan_document") },
    { type: "caption", text: "AADHAAR", sm: 12 },
    { name: "aadhaar", label: "Aadhaar Number",  type: "text", sm: 4 },
    { name: "aadhaar_holder_name", label: "Name of the Aadhaar Holder",  type: "text", sm: 4 },
    { name: "aadhaar_document",  type: "file",sm: 4,onChange: (e) => handleFileUpload(e.target.files[0], "aadhaar_document") },
    { type: "caption", text: "EPIC", sm: 12 },
    { name: "epic", label: "Epic Number",  type: "text", sm: 4 },
    { name: "epic_holder_name", label: "Name of the Epic Holder",  type: "text", sm: 4 },
    { name: "epic_document",  type: "file",sm: 4 ,onChange: (e) => handleFileUpload(e.target.files[0], "epic_document") },
    { type: "caption", text: "DRIVING LICENSE", sm: 12 },
    { name: "driving_licence", label: "DL No",  type: "text", sm: 4 },
    { name: "driving_licence_holder_name", label: "Name of the DL Holder", type: "text", sm: 4 },
    { name: "driving_licence_document",  type: "file", sm: 4, onChange: (e) => handleFileUpload(e.target.files[0], "driving_licence_document")  },
    { name: "pan_verified",  type: "hidden", value:"false"},
    { name: "aadhaar_verified",  type: "hidden", value:"false"},
    { name: "epic_verified",  type: "hidden", value:"false"},
    { name: "dl_verified",  type: "hidden", value:"false"},

  ];

  
  


  return (
    <Layout>
      <main id="main" className="main">
<section className="section">
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add Domestic User</h5>
          
          {!isClient ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            <CircularProgress />
          </div>
        ) : (
          <DynamicForm fields={fields} onSubmit={(values, actionType) => handleSubmit(values, actionType)}  handleFileUpload={handleFileUpload}  submitButtonText="Add More"  addNext="Save & Next" />
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
