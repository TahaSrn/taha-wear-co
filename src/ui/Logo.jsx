
import { memo } from "react";

function Logo({ mobile = false }) {
  return (
    <img
      src="/logo1.png"
      alt="Taha Wear logo"
      className={`
        object-contain
        shrink-0
        select-none

        ${mobile ? "h-13 scale-[300%]" : "h-8 scale-[700%] mr-28 mt-4"}
      `} />);


}

export default memo(Logo);