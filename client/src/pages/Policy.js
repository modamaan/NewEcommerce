import React from "react";
import Layout from "../component/Layout/Layout";

const Policy = () => {
  return (
    <Layout title="Privacy Policy">
      <div className="row policy">
        <div className="col-lg-6">
          <img
            className="img-fluid img"
            src="/images/contactus.jpeg"
            alt=""
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            perspiciatis dicta eveniet est nobis repellendus laboriosam?
            Exercitationem dicta recusandae cupiditate nulla. Corrupti, deserunt
            molestias. Optio, ipsam officia. Possimus, explicabo impedit?
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
