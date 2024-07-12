import React, { useEffect, useState } from "react";
import UserMenu from "../../component/Layout/UserMenu";
import Layout from "../../component/Layout/Layout";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";
import "../../styles/UserOrders.css";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [count, setCount] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("orderCount");
    if (existingCartItem) setCount(JSON.parse(existingCartItem));
  });

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 userorders ">
            <h3 className="text-center">All Orders</h3>
            {orders?.map((o, i) => {
              return (
                <div className="shadow ">
                  <table className="table usertable">
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
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 card p-3 flex-row">
                        <div className="col-md-4">
                          <img
                            className="card-img-top product-photo"
                            src={`/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                          />
                        </div>
                        <div className="col-md-8">
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
                          <p>Qty 1:- Price: {p.price}</p>
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

export default Orders;
