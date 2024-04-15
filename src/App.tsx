import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import TheRouter from "./TheRouter";
import Dashboard from "./Views/Dashboard";
import PageNotFound from "./Views/PageNotFound";
import List from "./Views/List";

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
          element: <List />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
