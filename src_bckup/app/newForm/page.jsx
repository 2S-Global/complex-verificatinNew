"use client";

import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

// ✅ Prevent hydration mismatch by using a simple <p> placeholder for SSR
const DynamicForm = dynamic(() => import("../components/DynamicForm_bckup"), {
  ssr: false, // Client-side only
});

export default function NewForm() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Hide loader after mount (avoids SSR mismatch)
  }, []);

  const fields = [
    { name: "firstName", label: "First Name", required: true, type: "text" },
    { name: "lastName", label: "Last Name", required: true, type: "text" },
    { name: "email", label: "Email", required: true, type: "email" },
    {
      name: "country",
      label: "Country",
      type: "select",
      required: true,
      options: [
        { value: "usa", label: "USA" },
        { value: "canada", label: "Canada" },
        { value: "india", label: "India" },
      ],
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      required: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "subscribe",
      label: "Subscribe to Newsletters",
      type: "checkbox",
      required: true,
      options: [
        { value: "news", label: "News" },
        { value: "offers", label: "Special Offers" },
        { value: "events", label: "Events" },
      ],
    },
    { name: "description", label: "Description", required: true, type: "textarea" },
    { name: "resume", label: "Upload Resume", type: "file", required: true },
  ];

  const handleSubmit = async (values) => {
    console.log("Submitting Form Data:", values);
  };

  return (
    <Layout>
      <main id="main" className="main">
        {loading ? (
          // ✅ Show CircularProgress only after hydration
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            <CircularProgress />
          </div>
        ) : (
          <DynamicForm fields={fields} onSubmit={handleSubmit} />
        )}
      </main>
    </Layout>
  );
}
