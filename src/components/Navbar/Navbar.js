import { Link } from 'react-router-dom';
import "./Navbar.css"

export default function Navbar() {
    return (
        <div className="navbar-container">
            <Link to="/">
                <p className="navbar-header">There'll <br />be Games... </p>
            </Link>

            <div className="navbar-menu">
                {/* <div className="menu-wrapper">

                </div> */}
                <p className="navbar-menu-link">by Genre</p>
                <p className="navbar-menu-link">by Platforms</p>
                <p className="navbar-menu-link">by Developers</p>
                <p className="navbar-menu-link">by Rating</p>
            </div>
        </div>
    )
}