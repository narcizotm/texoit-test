import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import TheRouter from "./TheRouter";
import Dashboard from "./Views/Dashboard";
import PageNotFound from "./Views/PageNotFound";
import MoviesList from "./Views/MoviesList";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TheRouter />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/list",
          element: <MoviesList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
