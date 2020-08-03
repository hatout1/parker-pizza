import React, { useEffect, useRef, useState } from "react";

import AuthService from "../Service/AuthService";
import Message from "../Message/Message";
import Axios from "axios";

const ProductsSetting = (props) => {
  const [product, setProduct] = useState({});

  const [file, setFile] = useState("");

  const [message, setMessage] = useState(null);

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setProduct({
      productTitle: "",
      category: "",
      description: "",
      image: "",
      ingredient: "",
      familySizePrice: "",
      mediumSizePrice: "",
      smallSizeProce: "",
      familySizeCost: "",
      mediumSizeCost: "",
      smallSizeCost: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    // data.append("product", { product });
    data.append("productTitle", product.productTitle);
    data.append("category", product.category);
    data.append("description", product.description);
    data.append("ingredient", product.ingredient);
    data.append("familySizePrice", product.familySizePrice);
    data.append("mediumSizePrice", product.mediumSizePrice);
    data.append("smallSizeProce", product.smallSizeProce);
    data.append("familySizeCost", product.familySizeCost);
    data.append("mediumSizeCost", product.mediumSizeCost);
    data.append("smallSizeCost", product.smallSizeCost);
    data.append("file", file);

    console.log(data);

    // AuthService.productSet(formData).then((data) => {
    Axios.post("/api/ProductsSetting", data).then((res) => {
      const { message } = res.data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/home");
        }, 1000);
      }
      console.log(res.data);
    });
  };

  return (
    <div>
      <div>
        <form className="formDiv" onSubmit={onSubmit}>
          <div className="form-groupDiv">
            <div className="inputRow">
              <select
                type="text"
                name="category"
                value={product.category}
                onChange={onChange}
                className="input"
                placeholder="category"
              >
                <option selected value="">
                  Select a category
                </option>
                <option value="pizza">Pizza</option>
                <option value="sauce">Sauce</option>
                <option value="breadStick">Bread Sticks</option>
              </select>
            </div>
            <div className="inputRow">
              <input
                type="text"
                name="productTitle"
                value={product.productTitle}
                onChange={onChange}
                className="input"
                placeholder="product title"
              />
            </div>
            <div className="inputRow">
              <input
                type="text"
                name="description"
                value={product.description}
                onChange={onChange}
                className="input"
                placeholder="description"
              />
            </div>
            <div className="inputRow">
              <input
                className="inputRow"
                type="text"
                name="ingredient"
                value={product.ingredient}
                onChange={onChange}
                placeholder="Enter ingredient"
              />
            </div>
            <div className="inputRow">
              <input
                type="text"
                name="familySizePrice"
                value={product.familySizePrice}
                onChange={onChange}
                className="inputRow"
                placeholder="Enter Family Size Price"
              />
              <input
                type="text"
                name="mediumSizePrice"
                value={product.mediumSizePrice}
                onChange={onChange}
                className="inputRow"
                placeholder="Enter Medium Size Price"
              />
              <input
                type="text"
                name="smallSizePrice"
                value={product.smallSizePrice}
                onChange={onChange}
                className="inputRow"
                placeholder="Enter Small Size Price"
              />
            </div>
            <div className="inputRow">
              <input
                type="text"
                name="familySizeCost"
                value={product.familySizeCost}
                onChange={onChange}
                className="inputRow"
                placeholder="Enter Family Size Cost"
              />
              <input
                type="text"
                name="mediumSizeCost"
                value={product.mediumSizeCost}
                onChange={onChange}
                className="inputRow"
                placeholder="Enter Medium Size Cost"
              />
              <input
                type="text"
                name="smallSizeCost"
                value={product.smallSizeCost}
                onChange={onChange}
                className="inputRow"
                placeholder="Enter Small Size Cost"
              />
            </div>
            <div className="flex">
              <label htmlFor="file">Product Picture</label>
              <input
                type="file"
                id="file"
                accept=".jpg"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setFile(file);
                }}
              />
            </div>
          </div>
          <div className="signupBtn">
            <button className="btn btn-dark btn-lg mt-4" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default ProductsSetting;
