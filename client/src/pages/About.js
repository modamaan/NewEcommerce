import React from "react";
import Layout from "../component/Layout/Layout";
const About = () => {
  return (
    <Layout title="About Us - Ecommerce App">
      <div className="container">
        <div className="row aboutus">
          <div className="col-lg-6">
            <img src="/images/about.jpeg" alt="" style={{ width: "100%" }} />
          </div>
          <div className="col-lg-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              perspiciatis dicta eveniet est nobis repellendus laboriosam?
              Exercitationem dicta recusandae cupiditate nulla. Corrupti,
              deserunt molestias. Optio, ipsam officia. Possimus, explicabo
              impedit?
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
