"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isClient, setIsClient] = useState(false); // Prevents hydration issues

  // Run only on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address") 
      .required("Email is required"), 
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  


  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setErrorMessage(""); // Clear previous error messages
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/complex/login",
        values,
        {
          headers: { "Content-Type": "application/json" },
          validateStatus: (status) => status < 500, // Allows handling 400/401 errors without throwing an exception
        }
      );
  
      // console.log("API Response:", response.data);
  
      if (response.status === 200 && response.data.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage(response.data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Unexpected API Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitting(false);
    }
  };
  
  // Avoid rendering until the client is detected
  if (!isClient) return null;

  return (
    <main className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <a className="logo d-flex align-items-center w-auto">
                  <img src="/assets/img/logo.png" alt="Logo" />
                  <span className="d-none d-lg-block">NiceAdmin</span>
                </a>
              </div>

              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p className="text-center small">Enter your email & password to login</p>
                  </div>

                  {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form className="row g-3">
                      
                        {/* Username Field */}
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">Email</label>
                          <Field type="text" name="email" className="form-control" />
                          <ErrorMessage  name="email" component="small" className="text-danger  mt-5 ms-2" />
                        </div>

                        {/* Password Field */}
                        <div className="col-12">
                          <label htmlFor="password" className="form-label">Password</label>
                          <Field type="password" name="password" className="form-control" />
                          <ErrorMessage name="password" component="small" className="text-danger  ms-2" />
                        </div>

                        {/* Remember Me Checkbox */}
                        <div className="col-12">
                          <div className="form-check">
                            <Field className="form-check-input" type="checkbox" name="remember" />
                            <label className="form-check-label" htmlFor="rememberMe">
                              Remember me
                            </label>
                          </div>
                        </div>

                        {/* Login Button */}
                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                          </button>
                        </div>

                        {/* Register Link */}
                        <div className="col-12">
                          <p className="small mb-0">
                            Don't have an account? <a href="/register">Create an account</a>
                          </p>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>

              <div className="credits">
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
