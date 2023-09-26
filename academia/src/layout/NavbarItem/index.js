import { NavLink } from "react-router-dom";

const NavbarItem = ({text, to}) => {

    return (
        <li className={'nav-item'}>
            <NavLink to={to} className={`nav-link text-light link-info`}>
                {text}
            </NavLink>
        </li>
    );

}

export default NavbarItem;