import { NavLink } from "react-router-dom";

const NavbarItem = ({text, to}) => {

    return (
        <li className={'nav-item'}>
            <NavLink to={to} className={`nav-link text-dark link-light`}>
                {text}
            </NavLink>
        </li>
    );

}

export default NavbarItem;