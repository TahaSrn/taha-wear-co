// src/ui/IconBar.jsx
import { useNavigate, useLocation } from "react-router";
import { HiOutlineUser } from "react-icons/hi";
import { memo, useCallback } from "react";

import CartIcon from "./CartIcon";
import { useAuth } from "../features/authentication/useAuth";

function IconBar({ mobile = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleUserClick = useCallback(() => {
    if (user) {
      navigate("/user");
    } else {
      navigate("/login", {
        state: {
          from: {
            pathname: location.pathname,
          },
        },
      });
    }
  }, [user, navigate, location.pathname]);

  return (
    <div
      className={`
        flex
        items-center
        gap-4
        shrink-0
        ${mobile ? "absolute left-4" : ""}
      `}
    >
      {!mobile && (
        <div
          onClick={handleUserClick}
          className="
            rounded-full
            bg-stone-500/20
            p-2
            cursor-pointer
            transition-all
            duration-300
            hover:bg-stone-800
            hover:text-white
          "
        >
          <HiOutlineUser size={30} strokeWidth={1.5} />
        </div>
      )}

      <CartIcon size={mobile ? "small" : "medium"} />
    </div>
  );
}

export default memo(IconBar);
