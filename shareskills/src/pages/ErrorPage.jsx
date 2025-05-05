import { useRouteError } from "react-router-dom";
// import ErrorImage from "../Images/error.png";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  // console.error(error);

  return (
    <div
      id="error-page"
      className="h-screen w-screen flex justify-center items-center bg-white"
    >
      <div className="flex flex-col md:flex-row justify-evenly items-center">
        <div className="mb-8 md:mb-0">
          {/* <img src={ErrorImage} alt="Error illustration" className="w-40 md:w-64" /> */}
        </div>

        {/* Error message */}
        <div className="text-center">
          <h1 className="text-9xl font-bold text-black">404</h1>
          <p className="text-2xl font-semibold">Page Not Found</p>
          <p className="text-lg text-gray-600">
            {error?.message || "Something went wrong. Please try again later."}
          </p>
          <Link
            to="/"
            className="mt-4 inline-block px-8 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-800 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
