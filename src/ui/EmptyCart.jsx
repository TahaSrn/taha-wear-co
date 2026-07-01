import { Link } from "react-router";
import Button from "./Button";
import { HiOutlineHome } from "react-icons/hi";

function EmptyCart() {
  return (
    <div className="font-sansMed flex flex-col items-center justify-center h-96 text-center">
      <span className="text-6xl mb-4">🛒</span>
      <h3 className="text-2xl font-bold text-stone-800">سبد خرید خالی است</h3>
      <p className="text-stone-500 mt-2">
        محصولات مورد نظر خود را به سبد خرید اضافه کنید
      </p>
      <Link to="/" className="mt-3">
        <Button type="primary" size="small">
          <span>بازگشت</span>
          <HiOutlineHome size={17} />
        </Button>
      </Link>
    </div>
  );
}

export default EmptyCart;
