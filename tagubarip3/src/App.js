import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProducts from "./pages/AddProducts";
import ViewProducts from "./pages/ViewProducts";
import UpdateProducts from "./pages/UpdateProducts";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ViewProducts />} />
          <Route path="/add" element={<AddProducts />} />
          <Route path="/update/:id" element={<UpdateProducts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
