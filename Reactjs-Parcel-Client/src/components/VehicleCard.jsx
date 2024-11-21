import { Link } from "react-router-dom";

const VehicleCard = (props) => {
  const {
    _id,
    brand,
    name,
    imageUrl,
    transactionType,
    availableLocation,
    pricePerDay,
  } = props.vehicleDetail;

  return props.vehicleDetail ? (
    <Link
      to={"/product-profile/" + _id}
      class="hover: cursor-pointer group border-2 border-blue-500 p-4 rounded-lg hover:bg-gradient-to-r from-cyan-300 to-blue-400"
    >
      <div class="h-40 w-auto overflow-hidden rounded-lg  flex items-center justify-center">
        <img
          src={imageUrl}
          alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
          class="h-full w-full object-fill"
        />
      </div>
      <h3 class="mt-4 text-sm text-gray-700 font-medium">Brand: {brand}</h3>
      <h3 class="mt-1 text-sm text-gray-700 font-medium">Model: {name}</h3>
      <p class="mt-1 text-sm text-gray-700 font-medium">
        Price/Day: ${pricePerDay}
      </p>
      <p class="mt-1 text-sm text-gray-700 font-medium">
        Available Location: {availableLocation}
      </p>
      <p class="mt-1 text-sm text-gray-700 font-medium">
        Mode of transmission: {transactionType}
      </p>
      {/* {props.mode === "vendor" ? (
        <>
          <button
            onClick={() => {
              handleEditProduct(_id);
            }}
            class="flex w-full justify-center rounded-md bg-indigo-600 my-2 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </button>
        </>
      ) : (
        <></>
      )} */}
    </Link>
  ) : (
    <div>
      <h1>Products details are Loading...</h1>
    </div>
  );
  // return (
  //   <div class="bg-white">
  //     <div class="mx-auto max-w-2xl sm:px-6 sm:py-10 lg:max-w-6xl lg:px-8">
  //       <h2 class="sr-only">Products</h2>
  //       <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
  //         {/* <a href="#" class="group">
  //           <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
  //             <img
  //               src={carImage}
  //               alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
  //               class="h-full w-full object-cover object-center group-hover:opacity-75"
  //             />
  //           </div>
  //           <h3 class="mt-4 text-sm text-gray-700">{brand}</h3>
  //           <h3 class="mt-1 text-sm text-gray-700">{model}</h3>
  //           <h3 class="mt-1 text-sm text-gray-700">{year}</h3>
  //           <h3 class="mt-1 text-sm text-gray-700">{color}</h3>
  //           <h3 class="mt-1 text-sm text-gray-700">{regNo}</h3>
  //           <p class="mt-1 text-lg font-medium text-gray-900">${dailyRate}</p>
  //         </a> */}
  //         {/* <a href="#" class="group">
  //           <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
  //             <img
  //               src="https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg"
  //               alt="Olive drab green insulated bottle with flared screw lid and flat top."
  //               class="h-full w-full object-cover object-center group-hover:opacity-75"
  //             />
  //           </div>
  //           <h3 class="mt-4 text-sm text-gray-700">Nomad Tumbler</h3>
  //           <p class="mt-1 text-lg font-medium text-gray-900">$35</p>
  //         </a>
  //          */}
  //         {/* <!-- More products... --> */}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default VehicleCard;
