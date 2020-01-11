import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [priceItems, setPriceItems] = useState(0)
    
    const url = "https://raw.githubusercontent.com/earthddx/ShoppingCartt/master/images.json"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setAllPhotos(data))
    }, []) //fecth data from images.json when component renders
    
    function toggleFavorite(id) { 
        const updatedArr = allPhotos.map(photo => {//map the array of all photos 
            if(photo.id === id) {                   //to see if the photo we favorited is in the array
                return {...photo, isFavorite: !photo.isFavorite} //if so, return a new obect with !isFavorite
            }
            return photo                                //if not, return the object
        })
        
        setAllPhotos(updatedArr) //update array of all photos with new isFavorite property
    }
    
    function addToCart(newItem) {
        setCartItems(prevItems => [...prevItems, newItem]) //every time a new item added to the cart, 
        setPriceItems(prevPrice => prevPrice + newItem.price)// we have to calculate total price
    }
    
    function removeFromCart(newItem) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== newItem.id)) //if the item is removed from cart
        setPriceItems(prevPrice => prevPrice - newItem.price)//calculate total price again
    }
    
    function emptyCart() { //empty cart after order is complete
        setCartItems([])
    }
    
    return (
        <Context.Provider value={{
            allPhotos, 
            toggleFavorite, 
            cartItems, 
            addToCart, 
            removeFromCart, 
            emptyCart,
            priceItems,
            setPriceItems
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context} //export both instead of just 'Context.provider' so we could use Context 