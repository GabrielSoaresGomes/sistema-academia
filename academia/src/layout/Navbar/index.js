import NavbarItem from "../NavbarItem";
import NavbarSearchInput from "../NavbarSearchInput";
import "./index.css";

const Navbar = ({handleSearch}) => {
    return (
        <nav className={"navbar navbar-expand-lg navbar-bg"}>
            <div className="container-fluid">
                <ul className={'navbar-nav'}>
                    <NavbarItem to={'/'} text={"Inicio"} />
                    <NavbarItem to={'add'} text={"Adicionar"} />
                </ul>
                <NavbarSearchInput handleSearch={handleSearch} />
            </div>
        </nav>
    )
}

export default Navbar;