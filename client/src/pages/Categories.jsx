import React from "react";
import Layout from "./../component/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title="All Categories">
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-lg-6 col-md-6 col-sm-12 mt-5 mb-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
