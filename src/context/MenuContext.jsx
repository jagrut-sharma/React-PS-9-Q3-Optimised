import { createContext, useContext, useState, useEffect, useRef } from "react";

import { fakeFetch } from "../API/fakeFetch";

const MenuContext = createContext({
  menuList: [],
  cartList: [],
  addToCart: (id) => {},
  applyFilter: (id) => {},
  inputText: null,
  inputChangeHandler: (id) => {}
});

export const MenuProvider = function ({ children }) {
  const [menuList, setMenuList] = useState(null);
  const [cartList, setCartList] = useState([]);
  const originalCartList = useRef(null);
  const [inputText, setInputText] = useState("");
  const [filterValue, setFilterValue] = useState({
    inputFilter: inputText,
    sortFilter: "",
    checkBox: []
  });

  const fetchMenu = async () => {
    try {
      const res = await fakeFetch("https://example.com/api/menu");
      const {
        data: { menu }
      } = res;
      setMenuList(menu);
      originalCartList.current = menu;
    } catch (err) {
      console.error(`${err.status}: ${err.message}`);
    }
  };

  const addToCart = (item) => {
    setCartList([...cartList, item]);
  };

  const inputChangeHandler = (e) => {
    const updatedObj = { ...filterValue, inputFilter: e.target.value };
    setInputText(e.target.value);
    setFilterValue(updatedObj);
    getUpdatedMenu(updatedObj);
  };

  const getUpdatedMenu = function (filterObj) {
    const { sortFilter, inputFilter, checkBox } = filterObj;

    // Applying checkbox first:

    let checkBoxApplied =
      checkBox.length > 0
        ? originalCartList.current.filter((item) =>
            checkBox.every((filterVal) => item[filterVal])
          )
        : originalCartList.current;

    // Implementing sort:

    if (sortFilter === "descending") {
      checkBoxApplied = [...checkBoxApplied].sort(
        ({ price: priceA }, { price: priceB }) => priceB - priceA
      );
    }
    if (sortFilter === "ascending") {
      checkBoxApplied = [...checkBoxApplied].sort(
        ({ price: priceA }, { price: priceB }) => priceA - priceB
      );
    }

    // Implementing search:
    if (inputFilter === "") {
      setMenuList(checkBoxApplied);
      return;
    }
    setMenuList(
      checkBoxApplied.filter(({ name }) => {
        return name.toLowerCase().includes(inputFilter.toLowerCase());
      })
    );

    // setMenuList(checkBoxApplied);
  };

  const applyFilter = (e) => {
    let updatedObj = { ...filterValue };
    const currValue = e.target.value;

    if (currValue === "is_vegetarian" || currValue === "is_spicy") {
      if (e.target.checked) {
        updatedObj.checkBox.push(currValue);
      } else {
        updatedObj.checkBox = updatedObj.checkBox.filter(
          (filterVal) => filterVal !== currValue
        );
      }
    } else {
      updatedObj.sortFilter = currValue;
    }

    setFilterValue(updatedObj);
    getUpdatedMenu(updatedObj);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const menuContext = {
    menuList,
    cartList,
    addToCart,
    applyFilter,
    inputText,
    inputChangeHandler
  };

  return (
    <MenuContext.Provider value={menuContext}>{children}</MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);
