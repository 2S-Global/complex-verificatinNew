"use client"; 
import Layout from "../components/Layout";
import SwitchLabels from "../components/Switch";
import SalesCard from "../components/SalesCard"; // Update the path accordingly
import BasicTable from "../components/basicTable";
import LineChart from "../components/LineChart";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from '@mui/icons-material/Groups';
import HandymanIcon from "@mui/icons-material/Handyman";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";


const rows = [
  { name: "John Doe", occupation: "Driver", approvedBy: "Manager A", date: "2024-03-01" },
  { name: "Jane Smith", occupation: "Technician", approvedBy: "Manager B", date: "2024-03-02" },
  { name: "Mike Johnson", occupation: "Babysitter", approvedBy: "Supervisor C", date: "2024-03-03" },
  { name: "Emily Davis", occupation: "Electrician", approvedBy: "Manager D", date: "2024-03-04" },
  { name: "Chris Brown", occupation: "Plumber", approvedBy: "Supervisor E", date: "2024-03-05" },
  { name: "Sarah Wilson", occupation: "Housekeeper", approvedBy: "Manager F", date: "2024-03-06" },
];




export default function Dashboard() {

  const handleViewClick = (title) => {
    alert(`Viewing details for ${title}`);
  };
  return (
    <Layout>
      <main id="main" className="main">
  <div className="pagetitle">
    <h1>Dashboard</h1>
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="index.html">Home</a>
        </li>
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>
  </div>
  {/* End Page Title */}
  <section className="section dashboard">


    <div className="row">
      {/* Left side columns */}
      <div className="col-lg-12">
        <div className="row">
          {/* Sales Card */}
          <div className="col-xxl-3 col-md-3">
            <div className="card">
            <SalesCard title="Owners" value={230} IconComponent={GroupsIcon} // Pass the icon correctly
       
      />
            </div>
          </div>
          {/* End Sales Card */}
          {/* Revenue Card */}
          <div className="col-xxl-3 col-lg-3  col-md-3">
            <div className="card ">
            <SalesCard title="Tenants" value={140} IconComponent={PeopleIcon}/>
            </div>
          </div>

          <div className="col-xxl-3 col-lg-3  col-md-3">
            <div className="card ">
            <SalesCard title="Domestic Helper" value={50} percentage={8} IconComponent={HandymanIcon} />
            </div>
          </div>

          <div className="col-xxl-3 col-lg-3  col-md-3">
            <div className="card">
            <SalesCard title="Transaction" value={200000} percentage={8} IconComponent={CurrencyRupeeIcon} />
            </div>
          </div>
          {/* End Revenue Card */}
          {/* Customers Card */}
          <div className="col-xxl-12 col-lg-12  col-xl-12">
            <div className="card info-card customers-card">
             <div className="card-body">
                <h5 className="card-title">
                  Latest Verified Users
                </h5>
                <div className="d-flex align-items-center">
            <BasicTable rows={rows}/>
             
                </div>
              </div>
            </div>
          </div>
          {/* End Customers Card */}
          {/* Reports */}
          <div className="col-12">
            <div className="card">
           
              <div className="card-body">
                <h5 className="card-title">
                  Reports 
                </h5>
                <LineChart/>
            </div>
          </div>
          </div>
          {/* End Reports */}
          {/* Recent Sales */}
    
          {/* End Top Selling */}
        </div>
      </div>
      {/* End Left side columns */}
      {/* Right side columns */}
 
      {/* End Right side columns */}
    </div>
  </section>
</main>

    </Layout>
  );
}
