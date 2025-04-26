import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProducts from "./pages/AddProducts";
import ViewProducts from "./pages/ViewProducts";
import UpdateProducts from "./pages/UpdateProducts";
import Login from "./pages/Login";
import GuestRoute from "./pages/GuestRoute";
import ProtectedRoute from "./pages/ProtectedRoute";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <GuestRoute>
                <Login />{" "}
              </GuestRoute>
            }
          />
          <Route
            path="/view-products"
            element={
              <ProtectedRoute>
                {" "}
                <ViewProducts />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddProducts />} />
          <Route path="/update/:id" element={<UpdateProducts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
