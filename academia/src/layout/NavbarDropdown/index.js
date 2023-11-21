import { NavLink } from "react-router-dom";

const NavbarDropdown = ({text, to}) => {

    return (
        <li className={`dropdown-item-list`}>
            <NavLink to={to} className={`dropdown-item`}>
                {text}
            </NavLink>
        </li>
    );
}

export default NavbarDropdown;