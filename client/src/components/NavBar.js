import React from "react";
import {Link} from "react-router-dom"

function Navbar() {

    return(
        <header className="header">
            <h1>React-ion: Seach for the Ruby!</h1>
            <nav>
                <ul>
                    <Link to="/">Home</Link>
                    <Link to="/town">Town</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/academy">Academy</Link>
                    <Link to="/dungeon">Dungeon</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar