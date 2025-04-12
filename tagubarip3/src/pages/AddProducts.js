import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [product, setProduct] = useState({
    product_name: "",
    product_price: "",
    product_quantity: "",
    sales_volume: "",
  });

  const navigate = useNavigate(); 

  const addProduct = async (product) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      console.log("Added:", data);

      navigate("/");
      alert("Product added successfully!!");
    } catch (error) {
      console.error("Add failed:", error);
      alert("Failed to add product.");
    }
  };


  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting product:", product);
    addProduct(product);
    setProduct({
      product_name: "",
      product_price: "",
      product_quantity: "",
      sales_volume: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Add New Product</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="product_name" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="product_name"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="product_price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="product_price"
                name="product_price"
                value={product.product_price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="product_quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="product_quantity"
                name="product_quantity"
                value={product.product_quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="sales_volume" className="form-label">
                Volume
              </label>
              <input
                type="number"
                className="form-control"
                id="sales_volume"
                name="sales_volume"
                value={product.sales_volume}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;