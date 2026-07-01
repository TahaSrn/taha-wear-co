import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../../ui/EmptyCart";
import CartItem from "./CartItem";
import Header from "../../ui/Header";

function Cart() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );

  if (items.length === 0) return <EmptyCart />;

  console.log(items);

  return (
    <>
      <Header />
      <div className="bg-caffee-50 pt-15">
        <div className="flex font-sansMed gap-40 border-b-2 pb-5 mr-[5%] px-40 w-fit border-gray-500/30">
          <span>محصول</span>
          <span>قیمت</span>
          <span>تعداد</span>
          <span>جمع جزء</span>
        </div>
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Cart;
