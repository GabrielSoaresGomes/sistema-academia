import "./NavbarItem.css";
import PAGE_ACTIVE from "../../entity/page-active";

const NavbarItem = ({text}) => {

    const handleClick = () => {
        console.log(text)
        PAGE_ACTIVE.page_active = text;
    };

    return (
        <li onClick={() => handleClick()} className={`navbar-item ${PAGE_ACTIVE?.page_active === text ? 'active' : ''}`}>
            {text}
        </li>
    );

}

export default NavbarItem;