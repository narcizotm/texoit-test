import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";
import styles from './components/Main/styles.module.css';

const TheRouter = () => {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default TheRouter;
