import React, {useState, useContext} from "react"
import PropTypes from "prop-types"

import {Context} from "../Context"

function Image({className, img}) {
    const [hovered, setHovered] = useState(false)
    const {toggleFavorite, addToCart, cartItems, removeFromCart} = useContext(Context)
    
    function heartIcon() { //'Heart' icon on the image
        if(img.isFavorite) { //'Heart' toggler
            return <i className="ri-heart-fill favorite" onClick={() => toggleFavorite(img.id)}></i>
        } else if(hovered) {
            return <i className="ri-heart-line favorite" onClick={() => toggleFavorite(img.id)}></i>
        }
    }
    
    function cartIcon() {           //'Shopping Cart' icon on the image
        const alreadyInCart = cartItems.some(item => item.id === img.id)//if the item was already added
        if(alreadyInCart) {         //another click on the icon will remove it from cart         
            return <i className="ri-shopping-cart-fill cart" onClick={() => removeFromCart(img)}></i>
        } else if(hovered) {
            return <i className="ri-add-circle-line cart" onClick={() => addToCart(img)}></i>//and add it again. pretty much a toggler function
        }
    }

    return (
        <div 
            className={`${className} image-container`}
            onMouseEnter={() => setHovered(true)} //when the mouse enter the image area, set hovered state to true
            onMouseLeave={() => setHovered(false)}//if it leaves, to false
        >
            <img src={img.url} className="image-grid"/> {/* display the image */}
            {heartIcon()}
            {cartIcon()}
        </div>
    )
}

Image.propTypes = {
    className: PropTypes.string,  //prop types to ensure the properties will be of a specific type
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })
}

export default Image
