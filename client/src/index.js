import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import "antd/dist/reset.css";
// const stripePromise = loadStripe(process.env.YOUR_PUBLISHABLE_API_KEY);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
//   <Elements stripe={stripePromise}>
//   <AuthProvider>
//     <SearchProvider>
//       <CartProvider>
//         <BrowserRouter>
//           <App />
//           <PaymentForm /> {/* You might want to render the PaymentForm here or within App component */}
//         </BrowserRouter>
//       </CartProvider>
//     </SearchProvider>
//   </AuthProvider>
// </Elements>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
