import { NavLink } from "react-router-dom";

const NavbarDropdown = ({text, to, handleModalChange}) => {

    return (
        <li className={`dropdown-item-list`}>
            {/*<NavLink to={to} >*/}
            <a className={`dropdown-item`} onClick={() => handleModalChange(to)}>{text}</a>
            {/*</NavLink>*/}
        </li>
    );
}

export default NavbarDropdown;