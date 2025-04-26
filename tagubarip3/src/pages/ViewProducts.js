import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/get-product');
      const data = await response.json();
      setProducts(data.products || []); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleArchive = async (id) => {
    if (!window.confirm("Are you sure you want to archive this product?")) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/delete-product/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        alert("Product deleted successfully!");
        
      } else {
        alert("Deletion failed.");
      }
    } catch (error) {
      console.error("Archive error:", error);
      alert("Something went wrong.");
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Product List</h3>
        <Link to="/add" className="btn btn-primary">+ Add Product</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price (₱)</th>
              <th>Quantity</th>
              <th>Volume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.product_price}</td>
                  <td>{product.product_quantity}</td>
                  <td>{product.sales_volume}</td>
                  <td>
                    <Link to={`/update/${product.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleArchive(product.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewProducts;
