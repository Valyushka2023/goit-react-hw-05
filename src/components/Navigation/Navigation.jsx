import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => (
  <nav className={css.nav}>
    <NavLink
      exact="true"
      to="/"
      className={({ isActive }) => (isActive ? `${css.link} ${css.activeLink}` : css.link)}
    >
      Home
    </NavLink>
    <NavLink
      to="/movies"
      className={({ isActive }) => (isActive ? `${css.link} ${css.activeLink}` : css.link)}
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;