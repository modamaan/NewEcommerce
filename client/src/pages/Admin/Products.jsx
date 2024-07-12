import Layout from "../../component/Layout/Layout";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../component/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./stylecss.css/AdminProducts.css";
const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Dashboard - Product List"}>
      <div className="container-fluid  ">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-8 col-sm-12 adminproducts">
            <h3 className="text-center">All Products List</h3>
            <div className="row-2">
              {products?.map((p) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 singleproduct"
                  key={p._id}
                >
                  <Link
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="text-decoration-none"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <div className="text-center">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top product-photo"
                          alt={p.name}
                        />
                      </div>
                      <div className="card-body text-center">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 30)}
                        </p>
                        <p className="card-text">{p.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
