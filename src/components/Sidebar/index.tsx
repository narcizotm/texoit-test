import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/list">List</NavLink>
    </nav>
  );
};

export default Sidebar;
