import React from "react";
import Layout from "../component/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title="Contact Us">
      <div className="row contactus">
        <div className="col-lg-6 col-md-12 img">
          <img src="/images/contactus.jpeg" alt="" style={{ width: "100%" }} />
        </div>
        <div className="col-lg-4 col-md-8">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any queries and information about products, feel free to call us
            anytime. We are available 24/7.
          </p>
          <p className="mt-3">
            <BiMailSend /> :{" "}
            <a href="mailto:helper@gmail.com" target="_blank" rel="noreferrer">
              helper@gmail.com
            </a>
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-00000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
