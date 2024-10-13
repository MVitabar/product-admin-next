import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Items = () => {
  return (
    <>
      <div className="flex flex-col w-11/12 items-center justify-center border border-solid border-gray-300 rounded-lg gap-2 py-3 md:flex-row md:justify-center md:w-full md:max-w-screen-xl sm:mx-6  ">
        <div className="flex flex-col text-center md:flex-row md:justify-between md:w-full md: mx-5">
          <h2 className="text-2xl font-bold">Mis Productos</h2>
          <div className="flex gap-2 justify-center">
            <Input
              id="search"
              name="searchbar"
              type="text"
              placeholder="Buscar"
              className=" h-7 w-2/4 md:w-full "
            />
            <Button id="search-btn" variant="outline" className="w-16 h-8">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Items;
