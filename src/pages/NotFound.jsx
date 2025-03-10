import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-lg text-gray-700 mt-2">
            Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
            to="/"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
        >
            Go Home
        </Link>
    </div>
);

export default NotFound;
