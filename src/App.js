import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Cart from "./pages/Carts";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
