import React from "react";
import Layout from "../component/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center mt-4">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Product Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="row justify-content-center">
            {values?.results.map((p) => (
              <div className="col-md-4 mb-4">
                <div className="card" style={{ width: "18rem" }}>
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
                    <button className="btn btn-primary">More Details</button>
                    <button className="btn btn-warning ms-2">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
