import { NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";

function NavigationBar() {
  return (
    <ul className="nav justify-content-center gap-5 fw-bold text-white">
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link">🌎 Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/spacecrafts" className="nav-link">🚀 SpaceCrafts</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/planets" className="nav-link">🪐 Planets</NavLink>
      </li>
    </ul>
  );
}

export default NavigationBar;

