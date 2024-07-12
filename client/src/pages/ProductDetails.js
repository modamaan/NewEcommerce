import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout";
import axios from "axios";
import { json, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";
const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  // ================
  
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

  // ================
  // o=initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 imagecontainer">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="product-image"
              alt={product.name}
            />
          </div>
          <div className="col-md-6 detailcomponent">
            <div className="producttext">
              <h1 className="product-details-heading">Product Details</h1>
              <div class="product-details">
                <p>Name: {product.name}</p>
                <p>Description: {product.description}</p>
                <p>Price:{product.price}</p>
                <p>Category: {product.category?.name}</p>
              </div>

              {/* <p>Name: {product.name}</p>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category?.name}</p> */}
            </div>
            <button
              className="btn btn-primary mt-2"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                //  setTimeout(() => {
                //   toast.success("Item added to cart");
                // }, 100);
                addToCart(product);
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className="container mt-4 similarproducts ">
        <h1 className="related-products-heading">Similar Products</h1>
        <div className="row">
          {relatedProducts?.map((p) => (
            <div className="col-md-4 mb-4 similarcardcontainer" key={p._id}>
              <div className="card similarcard">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top product-card-image"
                  alt={p.name}
                />
                <div className="card-body carddetails ">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 50)}</p>
                  <h6>₹ {p.price}</h6>
                  <div className="two-btn">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
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
                        addToCart(p);
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
