const NavbarSearchInput = ({handleSearch}) => {
    return (
        <form onSubmit={handleSearch} className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
            <button className="btn btn-outline-info" type="submit">Search</button>
        </form>
    );
}

export default NavbarSearchInput;