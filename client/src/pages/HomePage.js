import React, { useState, useEffect } from "react";
import Layout from "../component/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox } from "antd";
import { Radio } from "antd";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { Prices } from "../component/Prices";
import "../styles/AuthStyle.css";
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // ============================
  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      // If the item exists in the cart, update its quantity
      const updatedCart = cart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      );

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If the item doesn't exist in the cart, add it with an initial quantity of 1
      const updatedCart = [...cart, { ...item, count: 1 }];

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    toast.success("Item added to cart");
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by Category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint disable next line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProuct();
  }, [checked, radio]);

  // get fillterd product
  const filterProuct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Products - Best Offers">
      <div className="row">
        <div className="col-lg-2 col-md-4 mt-3">
          <div>
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column ms-2">
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column ms-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="d-flex flex-column mt-3 ms-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="col-lg-9 col-md-8 productlist ">
          <h3 className="text-center">All Products</h3>
          <div className="all-product">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <div className="images">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top product-photo mt-2"
                    alt={p.name}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">₹ {p.price}</p>
                </div>
                <div className="two-btn">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                    className="btn btn-warning"
                    onClick={() => addToCart(p)}
                  >
                    ADD TO CART
                  </button> */}
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      //  setTimeout(() => {
                      //   toast.success("Item added to cart");
                      // }, 100); 
                      addToCart(p)
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 m-2">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
