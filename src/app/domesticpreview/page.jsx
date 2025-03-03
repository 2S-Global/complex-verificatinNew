"use client";
import Link from "next/link";
import Layout from "../components/Layout";
import Caption from "../components/Caption";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";


const DynamicForm = dynamic(() => import("../components/DynamicForm"), {
  ssr: false, 
});

export default function PreviewUser() {

  
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [isClient, setIsClient] = useState(false)
  
  
    useEffect(() => {
      setLoading(false); 
      setIsClient(true);
    }, []);
  
    const fields = [
      
      { name: "d_image",  type: "file", required: true}
  
    ];


  return (
    <Layout>
      <main id="main" className="main">

      <section className="section profile">
    <div className="row">
        <div className="col-xl-4">
            <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                    <h2>Kevin Anderson</h2>
                    <h3><strong>Car Driver</strong></h3>
                    <p> A108 Adam Street, New York, NY 535022</p>
                    <p>(436) 486-3538 x29071</p>
                </div>
            </div>
        </div>
        <div className="col-xl-8">
            <div className="card">
                <div className="card-body pt-3">
                    {/* Bordered Tabs */}
                    <ul className="nav nav-tabs nav-tabs-bordered">
                        <li className="nav-item">
                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">
                                Overview Details
                            </button>
                        </li>
                        {/* <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">
                                Edit Profile
                            </button>
                        </li> */}
                      
                    </ul>
                    <div className="tab-content pt-2">
                        <div className="tab-pane fade show active profile-overview" id="profile-overview">
                            <h5 className="card-title">About</h5>
                            <p className="small fst-italic">
                                Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed
                                ea saepe at unde.
                            </p>
                            <h5 className="card-title">PAN</h5>
                            <div className="row  col-md-12">
                            <div className=" col-md-8"> 
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Number</div>
                                <div className="col-lg-9 col-md-8">
                                    AMPPG7969P
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Type</div>
                                <div className="col-lg-9 col-md-8">
                                    Person
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Verified</div>
                                <div className="col-lg-9 col-md-8">Yes</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Address</div>
                                <div className="col-lg-9 col-md-8">
                                    Lueilwitz, Wisoky and Leuschke
                                </div>
                            </div>
                            </div>
                            <div className=" col-md-4"> 
                            <img src="assets/img/profile-img.jpg" alt="Profile" />

                              </div>

                            </div>
                            <h5 className="card-title">AADHAAR</h5>
                            <div className="row  col-md-12">
                            <div className=" col-md-8"> 
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Full Name</div>
                                <div className="col-lg-9 col-md-8">
                                    Avik Ghosh
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">DOB</div>
                                <div className="col-lg-9 col-md-8">
                                   20-08-1985
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Gender</div>
                                <div className="col-lg-9 col-md-8">
                                   Male
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Father Name</div>
                                <div className="col-lg-9 col-md-8">
                                   Arup Kr. Ghosh
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Verified</div>
                                <div className="col-lg-9 col-md-8">Yes</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Address</div>
                                <div className="col-lg-9 col-md-8">
                                    Lueilwitz, Wisoky and Leuschke
                                </div>
                            </div>
                            </div>
                            <div className=" col-md-4"> 
                            <img src="assets/img/profile-img.jpg" alt="Profile" />

                              </div>

                            </div>
                            <h5 className="card-title">EPIC</h5>
                            <div className="row  col-md-12">
                            <div className=" col-md-8"> 
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Full Name</div>
                                <div className="col-lg-9 col-md-8">
                                    Avik Ghosh
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">EPIC</div>
                                <div className="col-lg-9 col-md-8">
                                KTF2559334
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Verified</div>
                                <div className="col-lg-9 col-md-8">Yes</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Constituency Name</div>
                                <div className="col-lg-9 col-md-8">
                                Rajarhat New Town
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Address</div>
                                <div className="col-lg-9 col-md-8">
                                    Lueilwitz, Wisoky and Leuschke
                                </div>
                            </div>
                            </div>
                            <div className=" col-md-4"> 
                            <img src="assets/img/profile-img.jpg" alt="Profile" />

                              </div>

                            </div>
                            <h5 className="card-title">DL</h5>
                            <div className="row  col-md-12">
                            <div className=" col-md-8"> 
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Name</div>
                                <div className="col-lg-9 col-md-8">Avik Ghosh</div>
                            </div>

                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Verified</div>
                                <div className="col-lg-9 col-md-8">Yes</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Cover</div>
                                <div className="col-lg-9 col-md-8">
                                    LMV
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label">Expiry Date</div>
                                <div className="col-lg-9 col-md-8">
                                    06-03-2033
                                </div>
                            </div>
                            </div>
                            <div className=" col-md-4"> 
                            <img src="assets/img/profile-img.jpg" alt="Profile" />

                              </div>
                       <p><Link href="./adddomesticuser"><button type="button" class="btn btn-success">Save & Add New</button></Link>&nbsp;&nbsp;  or &nbsp;&nbsp;  
                       <Link href="./paynow"><button type="button" class="btn btn-success">Save & Pay</button></Link></p>
                            </div>

                        </div>
                       
                    </div>
                    {/* End Bordered Tabs */}
                </div>
            </div>
        </div>
    </div>
</section>


</main>
</Layout>
  );
}
