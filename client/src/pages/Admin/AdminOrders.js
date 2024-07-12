import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Layout from "../../component/Layout/Layout";
import AdminMenu from "./../../component/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
import "./stylecss.css/AdminOrders.css";
const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Deleverd",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [count, setCount] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("orderCount");
    if (existingCartItem) setCount(JSON.parse(existingCartItem));
  });


  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  // update status
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid ">
        <div className="row ">
          <div className="col-lg-3 col-md-4 col-sm-12">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-8 col-sm-12 adminorders">
            <h3 className="text-center">All Orders</h3>
            {orders?.map((o, i) => {
              return (
                <div className="shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Item</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 card p-3 flex-row" key={p._id}>
                        <div className="col-lg-4 col-md-6">
                          <img
                            className="card-img-top product-photo"
                            src={`/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                          />
                        </div>
                        <div className="col-lg-8 col-md-6">
                          <h4>{p.name}</h4>
                          <p>{p.description.substring(0, 30)}</p>
                          {count.map((c) => {
                            if (c._id === p._id) {
                              return (
                                <p key={c._id}>Quantity: {c.count || 1}</p>
                              );
                            }
                            return null;
                          })}
                          <p>Price: {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
