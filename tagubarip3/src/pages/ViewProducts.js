import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get-product");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleArchive = async (id) => {
    if (!window.confirm("Are you sure you want to archive this product?"))
      return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/delete-product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData);
        alert("Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout.");
    }
  };

  const searchFunction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/search-product?search=${search}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Product search failed:", errorData);
        return;
      }
      const data = await response.json();
      console.log(data.message);
      console.log(data.searchList);
      setProducts(data.searchList || []);
    } catch (error) {
      console.error("Error during product search:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <form className="d-flex" onSubmit={searchFunction}>
          <input
            type="text"
            className="form-control me-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Product List</h3>
        <div>
          <Link to="/add" className="btn btn-primary me-2">
            + Add Product
          </Link>
          <button className="btn btn-warning" onClick={handleLogout}>
            Logout
          </button>
        </div>
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
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.product_price}</td>
                  <td>{product.product_quantity}</td>
                  <td>{product.sales_volume}</td>
                  <td>
                    <Link
                      to={`/update/${product.id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleArchive(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewProducts;
