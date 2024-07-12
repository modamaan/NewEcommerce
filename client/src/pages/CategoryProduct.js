import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryProduct.css"
const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    if (params?.slug) getProductBycat();
  }, [params?.slug]);
  const getProductBycat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-3">
        <h3 className="text-center">Category - {category?.name}</h3>
        <h6 className="text-center">{products?.length} result(s) found</h6>
        <div className="row">
          <div className="col-lg-9 offset-lg-1">
            <div className="d-flex flex-wrap categoryproduct">
              {products?.map((p) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={p._id}>
                  <div className="card" style={{ width: "19rem" }}>
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
                      <p className="card-text">₹ {p.price}</p>
                     <div className="two-btn" >
                     <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button className="btn btn-warning ms-2">
                        ADD TO CART
                      </button>
                     </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
