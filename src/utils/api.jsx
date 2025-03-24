import axios from "axios";

// ✅ Fetch Apartments
export const fetchApartments = async (setApartments, setError) => {
  try {
    const response = await axios.post(
      "https://complex-verification-api.onrender.com/api/owners/getApartments",
      { complex_id: "1" },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("API Response:", response.data);

    if (response.data.flatNumbers && Array.isArray(response.data.flatNumbers)) {
      const uniqueApartments = [...new Set(response.data.flatNumbers)];
      const options = uniqueApartments.map((apt) => ({ value: apt, label: apt }));

      setApartments(options);
      setError(null);
    } else {
      console.error("Invalid response format:", response.data);
    }
  } catch (error) {
    handleApiError(error, setError);
  }
};

// ✅ Upload File
export const handleFileUpload = async (file, fieldName, setFieldValue) => {
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

    setFieldValue(fieldName, { file, uploadedFilename: uploadResponse.data.fileName });

    console.log(`Uploaded ${fieldName}:`, uploadResponse.data.fileName);
  } catch (error) {
    console.error(`Error uploading ${fieldName}:`, error);
    alert(`Error uploading file: ${error.message}`);
  }
};

// ✅ Handle API errors
const handleApiError = (error, setError) => {
  if (error.response) {
    const status = error.response.status;

    if (process.env.NODE_ENV === "development" && status !== 404 && status !== 500) {
      console.error("API Error:", status, error.response.data);
    }

    setError(`Error: ${status} - ${error.response.data}`);
  } else if (error.request) {
    setError("Server is not responding. Please try again later.");
  } else {
    setError("Something went wrong. Please check your request.");
  }
};
