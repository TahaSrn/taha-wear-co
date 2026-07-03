// src/ui/Menu.jsx (اصلاح شده)
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi";

import MenuSearch from "./MenuSearch";
import MenuItems from "./MenuItems";

function Menu({ onCategoryClick }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleCategoryClick = () => {
    setIsOpenMenu(false);
    if (onCategoryClick) {
      onCategoryClick();
    }
  };

  const menuItems = [
    { id: 1, component: <MenuSearch />, label: "جستجو" },
    {
      id: 2,
      component: (
        <MenuItems
          onClose={() => setIsOpenMenu(false)}
          onCategoryClick={handleCategoryClick}
        />
      ),
      label: "آیتم ها",
    },
  ];

  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpenMenu]);

  return (
    <>
      <HiMenuAlt3
        className="text-5xl mr-1 text-stone-800 z-10 relative cursor-pointer transition-colors"
        onClick={() => setIsOpenMenu((open) => !open)}
      />

      {createPortal(
        <AnimatePresence>
          {isOpenMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/40 z-[9999]"
                onClick={() => setIsOpenMenu(false)}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  duration: 0.4,
                }}
                className="fixed right-0 top-0 h-full w-[80vw] bg-caffee-50 shadow-2xl p-6 z-[10000] overflow-y-auto border"
              >
                <nav className="mt-2">
                  <div className="space-y-4">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b pb-2"
                      >
                        {item.component}
                      </motion.div>
                    ))}
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

export default Menu;
