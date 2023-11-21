import NavbarItem from "../NavbarItem";
import NavbarSearchInput from "../NavbarSearchInput";
import NavbarDropdown from "../NavbarDropdown";

import "./index.css";
import {NavLink} from "react-router-dom";

const Navbar = ({handleSearch}) => {
    return (
        <nav className={"navbar navbar-expand-lg navbar-bg"}>
            <div className="container-fluid">
                <ul className={'navbar-nav'}>
                    <NavbarItem to={'/'} text={"Inicio"} />
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Adicionar
                        </a>
                        <ul className="dropdown-menu">
                            <NavbarDropdown to={'/add/exercise'} text={'Exercicios'}/>
                            <NavbarDropdown to={'/add/category'} text={'Categorias'}/>
                        </ul>
                    </li>
                </ul>
                <NavbarSearchInput handleSearch={handleSearch} />
            </div>
        </nav>
    )
}

export default Navbar;