import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
//import MenuComponent from "./components/common/menu-component";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "not-found",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <Navigate to="/not-found" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
