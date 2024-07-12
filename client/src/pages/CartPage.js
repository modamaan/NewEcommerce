import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import "../styles/CartPage.css";
const CartPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const cartTotalPrice = cart?.reduce((total, item) => {
    const count = item.count || 1;
    return total + item.price * count;
  }, 0);
  // total price
  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      const count = item.count !== undefined && item.count > 0 ? item.count : 1;
      total = total + item.price * count;
    });

    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const handleQuantityChange = (e, product) => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    cart.forEach((cartItem) => {
      if (cartItem._id === product._id) {
        cartItem.count = e.target.value;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gatway
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth.token]);


  // handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      localStorage.setItem("orderCount", JSON.stringify(cartData));

      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      setTimeout(() => {
        toast.success("Payment Completed Successfully");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `You Have ${cart.length} Items in your cart ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row-2">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 card p-3 flex-row cartproduct">
                <div className="col-md-4">
                  <img
                    className="card-img-top product-photo"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8 productremove">
                  <h3>{p.name}</h3>
                  <p>{p.description.substring(0, 30)}</p>
                  <input
                    min={"1"}
                    max={p.quantity}
                    type="number"
                    value={p.count}
                    defaultValue={1}
                    onChange={(e) => handleQuantityChange(e, p)}
                  />
                  <p>Price: {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center cartpayment">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <h4>Total: {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      googlePay: {
                        googlePayVersionL: 2,
                        merchantId: "01234567890123456789",
                        transactionInfo: {
                          totalPriceStatus: "FINAL",
                          totalPrice: cartTotalPrice.toFixed(2),
                          currencyCode: "INR",
                        },
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                 
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
               
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
