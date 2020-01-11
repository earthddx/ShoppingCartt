import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {Context} from "../Context"

function Header() {
    const {cartItems} = useContext(Context)
    const cartClassName = cartItems.length ? "ri-shopping-cart-fill" : "ri-shopping-cart-line" //display emty shopping cart if its emty, full otherwise
    return (
        <header>
            <Link to="/"><h2>ShoppingCartt</h2></Link>
            <Link to="/cart">
                <i className={`${cartClassName} ri-fw ri-2x`}></i>
            </Link>
        </header>
    )
}

export default Header
