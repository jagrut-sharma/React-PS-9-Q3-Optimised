import { useMenuContext } from "../context/MenuContext";

export default () => {
  const { inputChangeHandler, inputText, applyFilter } = useMenuContext();

  return (
    <>
      <input
        type="text"
        placeholder="Search Food here"
        onChange={inputChangeHandler}
        value={inputText}
      />
      <label>
        <input type="checkbox" value="is_vegetarian" onChange={applyFilter} />
        Veg
      </label>
      <label>
        <input type="checkbox" value="is_spicy" onChange={applyFilter} />
        Spicy
      </label>
      <label>
        <input
          type="radio"
          name="sort"
          id="sort-ascending"
          value="ascending"
          onChange={applyFilter}
        />
        Sort (price) Low to High
      </label>
      <label>
        <input
          type="radio"
          name="sort"
          id="sort-descending"
          value="descending"
          onChange={applyFilter}
        />
        Sort (price) High to Low
      </label>
    </>
  );
};
