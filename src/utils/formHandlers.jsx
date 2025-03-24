import axios from "axios";
import { useRouter } from "next/navigation";

// ✅ Handle Form Submission
export const handleSubmit = async (values, actionType) => {
  const router = useRouter();

  try {
    console.log("Form Data Before Processing:", values);

    // ✅ Prepare request data
    const requestData = { ...values, complex_id: "1", status: "0" };

    // ✅ Convert file objects to only send uploadedFilename
    Object.keys(requestData).forEach((key) => {
      if (requestData[key] && typeof requestData[key] === "object" && requestData[key].uploadedFilename) {
        requestData[key] = requestData[key].uploadedFilename;
      }
    });

    console.log("Final Request Data:", JSON.stringify(requestData, null, 2));

    // ✅ Send request
    const response = await axios.post(
      "http://localhost:5000/api/domestic/createDomesticUser",
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
