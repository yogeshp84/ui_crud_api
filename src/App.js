import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage, { ListingLoader } from "./pages/HomePage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          index: true,
          element: <HomePage />,
        },
        {
          path: "/create",
          index: true,
          element: <CreatePost />,
        },
        {
          path: "/edit/:id",
          index: true,
          element: <EditPost />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
