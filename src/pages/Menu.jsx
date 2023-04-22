import Filters from "../components/Filters";
import MenuCard from "../components/MenuCard";
import { useMenuContext } from "../context/MenuContext";

export default function Menu() {
  const { menuList } = useMenuContext();

  if (!menuList) return <h1>Loading....</h1>;

  return (
    <div className="container">
      <h3>Filters</h3>
      <Filters />
      <h3>Menu</h3>
      <div className="menu-container">
        {menuList.map((item) => (
          <MenuCard key={item.id} {...item} inMenu />
        ))}
      </div>
    </div>
  );
}
