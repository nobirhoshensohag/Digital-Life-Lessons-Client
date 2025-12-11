import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PublicLessons from "../pages/PublicLessons";
import Contact from "../pages/Contact";
import AddLessons from "../pages/ProtectedPages/AddLessons";
import PrivateRoute from "../routes/PrivateRoute/PrivateRoute";
import LessonDetails from "../pages/LessonDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
       {
        path: "public-lessons",
        element: <PublicLessons />,
      },
       { path: "contact", 
        element: <Contact /> 
      },
       {
        path: "add-lessons",
        element: (
          <PrivateRoute>
            <AddLessons />
          </PrivateRoute>
        ),
      },
      {
        path: "/lesson-details/:id",
        element: <LessonDetails />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);