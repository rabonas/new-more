import { Link, NavLink } from "react-router-dom";

export default function Headers() {
    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <Link to="/"><img src='img/logo2.png' alt="" className="logo" /></Link>

                    <nav>
                        <NavLink to="/catalog" className="header__link" activeClassName="active__link">Catalog</NavLink>
                        <NavLink to="/search" className="header__link" activeClassName="active__link">Search</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}