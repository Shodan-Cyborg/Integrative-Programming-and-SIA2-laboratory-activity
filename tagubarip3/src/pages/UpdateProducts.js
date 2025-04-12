import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    product_name: "",
    product_price: "",
    product_quantity: "",
    sales_volume: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/edit-product/${id}`
        );
        const data = await response.json();
        setProduct(data.products);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/update-product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
  
      if (!response.ok) {
        throw new Error("Update failed");
      }
  
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Update successful:", data);
      }
  
      alert("Product updated successfully!!");
      navigate("/");
  
    } catch (error) {
      console.error("Update failed:", error);
      alert("Could not update product.");
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
    updateProduct(product);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-warning text-white">
          <h4 className="mb-0">Update Product</h4>
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
                name="product_name"
                value={product?.product_name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="product_price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                name="product_price"
                value={product?.product_price || ""}
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
                name="product_quantity"
                value={product?.product_quantity || ""}
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
                name="sales_volume"
                value={product?.sales_volume || ""}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
