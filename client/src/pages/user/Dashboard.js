import React from "react";
import Layout from "../../component/Layout/Layout";
import UserMenu from "../../component/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import "../../styles/UserDashboard.css"
const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 userdetails ">
            <div className="card w-75 p-3">
              <h3><h5>Name:</h5> {auth?.user?.name}</h3>
              <h3><h5>Email:</h5> {auth?.user?.email}</h3>
              <h3><h5>Address:</h5> {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
