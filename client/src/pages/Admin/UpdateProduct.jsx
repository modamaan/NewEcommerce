import React, { useState, useEffect } from "react";
import Layout from "../../component/Layout/Layout";
import AdminMenu from "../../component/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import './stylecss.css/UpdateProduct.css'
const { Option } = Select;
const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disabled-next-line
  }, []);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // delete product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure Want To Delete This Product ?");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
      <Layout title={"Dashboard - Update Product"}>
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/4 md:w-1/3">
          <AdminMenu />
        </div>
        <div className="w-full lg:w-3/4 md:w-2/3">
          <h3 className="text-center text-xl font-semibold mb-4">
            Update Product
          </h3>
          <div className="space-y-4">
            <Select
              className="form-select mb-3"
              placeholder="Select a Category"
              options={categories?.map((c) => ({
                value: c._id,
                label: c.name,
              }))}
              onChange={(option) => setCategory(option.value)}
              value={categories.find((c) => c._id === category)}
            />
            <div className="mb-3">
              <label className="block w-full p-2 border border-gray-300 rounded">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="text-center">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Product Photo"
                  className="h-48 w-auto mx-auto"
                />
              ) : (
                <img
                  src={`/api/v1/product/product-photo/${id}`}
                  alt="Product Photo"
                  className="h-48 w-auto mx-auto"
                />
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="form-input w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                value={description}
                placeholder="Write a description"
                className="form-textarea w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={price}
                placeholder="Give Price"
                className="form-input w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={quantity}
                placeholder="Write quantity"
                className="form-input w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                className="form-select mb-3"
                placeholder="Select Shipping"
                options={[
                  { value: "0", label: "NO" },
                  { value: "1", label: "Yes" },
                ]}
                onChange={(option) => setShipping(option.value === "1")}
                value={shipping ? { value: "1", label: "Yes" } : { value: "0", label: "NO" }}
              />
            </div>
            <div className="flex space-x-3">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleUpdate}
              >
                Update Product
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default UpdateProduct;
