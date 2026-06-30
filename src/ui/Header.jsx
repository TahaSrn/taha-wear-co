import Categories from "./Categories";
import IconBar from "./IconBar";
import Logo from "./Logo";
import Search from "./Search";

function Header() {
  return (
    <header className="bg-cyan-100 flex flex-col">
      <div className="flex items-center relative">
        <Logo />
        <Search />
        <IconBar />
      </div>

      <Categories />
    </header>
  );
}

export default Header;
