import useGetNewestProducts from "../products/useGetNewestProducts";
import NewestProduct from "./NewestProduct";
import Spinner from "../../ui/Spinner";

function NewestProducts() {
  const { newestProducts, isLoading } = useGetNewestProducts();

  if (isLoading)
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-110 rounded-xl bg-caffee-100 flex items-center justify-center"
          >
            <Spinner />
          </div>
        ))}
      </div>
    );

  console.log(newestProducts);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
      {newestProducts.map((pro) => (
        <NewestProduct key={pro.id} product={pro} />
      ))}
    </div>
  );
}

export default NewestProducts;
