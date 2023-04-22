import { useMenuContext } from "../context/MenuContext";

export default function MenuCard(item) {
  const { addToCart, cartList } = useMenuContext();
  const {
    id,
    name,
    description,
    price,
    image,
    delivery_time: deliveryTime,
    inMenu
  } = item;

  return (
    <div className="menu-card">
      <img className="food-img" src={image} alt={name} />
      <p>
        <strong>Name: </strong>
        {name}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
      <p>
        <strong>Price: </strong>
        {price}
      </p>
      <p>
        <strong>Delivery Time: </strong>
        {deliveryTime} min
      </p>
      {!inMenu ? (
        ""
      ) : cartList.length && cartList.find((product) => product.id === id) ? (
        <button disabled> Added to Cart</button>
      ) : (
        <button onClick={() => addToCart(item)}>Add to Cart</button>
      )}
    </div>
  );
}
