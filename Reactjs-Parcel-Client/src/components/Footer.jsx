import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer class=" bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded-lg shadow m-4 dark:bg-gray-800">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-800 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="" class="hover:underline">
            VehicleBazar™
          </a>
          . All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-800 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to="/about" class="hover:underline me-4 md:me-6">
              About
            </Link>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <Link href="#" class="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

// return (
//   <div className="bottom-0 bg-gradient-to-r from-cyan-500 to-blue-500 p-10">
//     <ul className="flex justify-center p-0 m-0 list-none mr-24">
//       <li className="font-bold list-none m-0 mr-2">
//         <Link to="/"> FAQ's </Link>
//       </li>
//       <li className="font-bold list-none m-0 mr-2">
//         <Link to="/"> ContactUs </Link>
//       </li>
//       <li className="font-bold list-none m-0 mr-2">
//         <Link to="/About"> AboutUs </Link>
//       </li>
//     </ul>
//   </div>
// );
