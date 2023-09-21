import NavbarItem from "../NavbarItem";
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav className={"navbar"}>
            <NavbarItem text={"Home"} />
            <NavbarItem text={"Add"}/>
        </nav>
    )
}

export default Navbar;