import CategoriesSelect from "../features/categories/CategoriesSelect";
import IconBar from "./IconBar";
import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";

function Header() {
  return (
    <header className="bg-cyan-100 flex flex-col relative">
      <div className="block md:hidden absolute right-0 top-1/2 -translate-y-1/2">
        <Menu />
      </div>
      <div className="flex items-center justify-center md:justify-start relative mt-4 md:mt-1 pb-4 md:pb-0">
        <Logo />
        <div className="w-[75%] h-full mr-10 hidden md:block">
          <Search />
        </div>
        <IconBar />
      </div>

      <div className="hidden md:block">
        <CategoriesSelect />
      </div>
    </header>
  );
}

export default Header;
