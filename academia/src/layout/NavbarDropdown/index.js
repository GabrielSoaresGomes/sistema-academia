import { NavLink } from "react-router-dom";

const NavbarDropdown = ({text, to, handleModalChange}) => {

    return (
        <li className={`dropdown-item-list`}>
            {/*<NavLink to={to} className={`dropdown-item`}>*/}
            <p onClick={() => handleModalChange(to)}>{text}</p>
            {/*</NavLink>*/}
        </li>
    );
}

export default NavbarDropdown;