import VehicleCard from "./VehicleCard";
import useAllVehicleDetails from "../utils/useAllVehicleDetails";
import Search from "./Search";
import { useState } from "react";
import Filter from "./Filter";

const Body = ({ values }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const { totalSize, vehicleData } = useAllVehicleDetails(
    values,
    page,
    pageSize,
    search,
    filter
  );

  const handleSearch = (searchResults) => {
    setSearch(searchResults);
  };

  const handleFilter = (filterValue) => {
    setFilter(filterValue);
  };

  return (
    <div>
      <div className="flex m-5 p-5 justify-center">
        <Search onSearch={handleSearch} />
        <Filter onPurchaseModeChange={handleFilter} />
      </div>
      <div class="bg-white">
        <div class="mx-auto max-w-2xl sm:px-6 sm:py-10 lg:max-w-6xl lg:px-8">
          <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {vehicleData.length > 0 ? (
              vehicleData.map((detail) => (
                <VehicleCard
                  key={detail._id}
                  vehicleDetail={detail}
                  mode={values}
                />
              ))
            ) : (
              <p>No vehicles found</p>
            )}
          </div>
          <div class="flex justify-between items-center my-10 border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <p className="font-semibold">Total Products: {totalSize}</p>
            <div>
              <input
                className="w-14 text-sm text-center mx-2 px-1 py-1 border-2 border-black rounded-md"
                type="text"
                placeholder="size"
                onChange={(e) => setPageSize(e.target.value)}
              />
              <button
                class="items-center rounded-md border text-white bg-indigo-700 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm mx-2 px-4 py-2 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <button
                class="items-center rounded-md border text-white bg-indigo-700 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm mx-2 px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() =>
                  setPage((prev) => (prev < totalSize ? prev + 1 : prev))
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
