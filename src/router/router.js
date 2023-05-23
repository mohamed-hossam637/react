import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home/Home.jsx"
import Layout from "../components/layout/Layout.jsx";
import NotFound from "../components/not found/NotFound.jsx";
import Login from "../components/login/Login.jsx";
import Explore from "../components/explore/Explore.jsx";
import Register from "../components/register/Register.jsx";
import MovieDetails from "../components/movieDetails/MovieDetails.jsx";
import TopRated from "../components/topRated/TopRated.jsx";
import Favorite from "../components/favorite/Favorite.jsx";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/explore",
                element: <Explore />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/top_rated",
                element: <TopRated />
            },
            {
                path: "/favorite",
                element: <ProtectedRoute> <Favorite /> </ProtectedRoute>
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/movie_details/:id/:media_type",
                element: <MovieDetails />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
])

export default router;