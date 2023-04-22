import { useMenuContext } from "../context/MenuContext";
import { NavLink } from "react-router-dom";

export default function Header() {
  const { cartList } = useMenuContext();

  const getStyle = ({ isActive }) => {
    return isActive ? "active-link link" : "link";
  };

  return (
    <>
      <NavLink className={getStyle} to="/">
        Home
      </NavLink>{" "}
      <NavLink className={getStyle} to="/menu">
        Menu
      </NavLink>{" "}
      <NavLink className={getStyle} to="/cart">
        Cart{cartList.length === 0 ? "" : `(${cartList.length})`}
      </NavLink>
    </>
  );
}
