import { useState } from "react";

import MenuCard from "../components/MenuCard";
import { useMenuContext } from "../context/MenuContext";

export default function Cart() {
  const { cartList } = useMenuContext();
  const [totalPrice, setTotalPrice] = useState(
    cartList.reduce((acc, { price }) => acc + price, 0)
  );
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  if (cartList.length === 0) return <h2>Add some items in the cart....</h2>;

  const couponHandler = () => {
    setTotalPrice((totalPrice) => totalPrice - 5);
    setIsCouponApplied(true);
  };

  return (
    <div className="cart-container">
      <h3>Cart</h3>
      <p>
        <strong>Total Delivery Time: </strong>
        {cartList.reduce(
          (acc, { delivery_time: deliveryTime }) => acc + deliveryTime,
          0
        )}{" "}
        min
      </p>
      <p>
        <strong>Total Price: </strong>
        Rs. {totalPrice}
      </p>
      <button onClick={couponHandler} disabled={isCouponApplied}>
        {isCouponApplied ? "Coupon Applied" : "Apply Coupon"}
      </button>
      <div className="card-container">
        {cartList.map((item) => (
          <MenuCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
