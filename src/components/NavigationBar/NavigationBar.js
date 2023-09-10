import { NavLink } from "react-router-dom";
// import style from "./NavigationBar.module.css";


function NavigationBar() {


  const routes = [
    { to: "/", title: "🌎 Home" },
    { to: "/spacecrafts", title: "🚀 SpaceCrafts" },
    { to: "/planets", title: "🪐 Planets" }
  ]
  return (
    <ul className="nav justify-content-center gap-5 fw-bold text-white">
      {
        routes.map((route, id) => {
          return (
            <li className={`nav-item`} key={id}>
              <NavLink to={route.to} className={`nav-link}`} style={{color: "#ffff", fontWeight: "bold", textDecoration: "none"}}>{route.title}</NavLink>
            </li>
          )
        })
      }
    </ul>
  );
}

export default NavigationBar;

