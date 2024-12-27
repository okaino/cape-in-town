import React, { useState, useMemo,useEffect  } from 'react';
import store, { updateAllProducts, deleteCart  } from '../store/store';
import { useSelector } from 'react-redux';
import OklahomaCheeseHamburger from "../image/oklahoma-cheese.jpg"
import OklahomaHamburger from "../image/oklahoma-cheese.jpg"
import ChickenBurger from "../image/chicken-burger.jpg"
import WhatsappIcon from "../image/whatsapp.png"
// import OklahomaCheeseHamburgerCategory from "../image/oklahoma-cheese.jpg"
// import OklahomaCheeseHamburgerCategory from "../image/oklahoma-cheese.jpg"
import DrinksCategory from "../image/icecek-kategori.png"
import SnackCategory from "../image/chicken-tenders.jpg"

import './ShoppingCartDrawer.css';

const ShoppingCartDrawer = ({  onOrder }) => {
  let count = useSelector((state) => state.products);
  const [cartDynamic, setCartDynamic] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState("");
  useEffect(() => {
    setCartDynamic([...count]); // Initialize cartDynamic with products state
  }, [count]);

//   const transformedArray = useMemo(() => {
//     count.forEach(item => {
//         let existingItem = cartDynamic.find(obj =>
//             Object.keys(item).every(key => obj[key] === item[key])
//         ); 
//         if (existingItem) {
//             existingItem.quantity += 1;
//         } else {
//           cartDynamic.push({ ...item, quantity: 1 });
//         }
//     });
//     return cartDynamic;
// }, [count]);
  const toggleDrawer = () => setIsOpen(!isOpen);


  const handleQuantityChange = (index, delta) => {
    setCartDynamic((prevCart) => {
      const updatedCart = prevCart.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      );
  
      // Dispatch the updated cart to Redux
      store.dispatch(updateAllProducts(updatedCart));
      return updatedCart;
    });
  };
  const handleTextChange = (e) => {
    const value = e.target.value;
    setAddress(value)

    if (value.length < 20) {
      setError("Minimum 20 karakter giriniz.");
    } else {
      setError("");
    }
  };
  const handleCategoryImage = (foodName) => {
    // Add your navigation logic here (e.g., using react-router)
    switch (foodName) {
      case "Oklahoma Cheese Burger":
        return OklahomaCheeseHamburger;
        break;

      case "Oklahoma Hamburger":
        return OklahomaHamburger;
        break;

      case "Chicken Burger":
        return ChickenBurger;
        break;

      case "Chicken Tenders":
        return SnackCategory;
        break;

      case "Baharatlı Patates Cipsi":
        return SnackCategory;
        break;

    }
  };
  return (
    <>
    {isOpen ? 
      <button className="toggle-button" onClick={toggleDrawer}>X
      </button> : null
}
<div className="screen-wide">
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Sepetim</h2>
        </div>
        <div className="cart-items">
          {cartDynamic.map((item, index) => (
            <div key={index} className='cart-item-row'>
            <div key={index} className="cart-item">
              <img src={handleCategoryImage(item.name)} alt={item.name} className="item-image" />
              <span className="item-name">{item.name}</span>
              
              </div>

              <div className='cart-item-info'>
              <span className='item-price'>{item.price * item.quantity} TL</span>
              {(item.extraPatty || item.extraChick) &&  
              <span className="item-name">Extra {item.extraPatty ? item.extraPatty + " x Köfte(120gr.)" : item.extraChick ? item.extraChick+ "x Tavuk(120gr.)" : ""}</span>
              }
              <div className="item-ops-button">
              <button onClick={() => handleQuantityChange(index, -1)}  className='item-quantity'>-</button>
              {/* <p>{itemCountById(item.id)}</p> */}
              <p className='item-quantity-num'>{item.quantity}</p>
              <button onClick={() => handleQuantityChange(index, 1)} className='item-quantity'>+</button>
              </div>
              </div>
              </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className='adress'>
          <div className='address-header'><p>Adres*:</p></div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <textarea
            className='address-section'
            placeholder={"Adres*..."}
            value={address}
            onChange={(e) => handleTextChange(e)}
          />
          </div>
          <div className='adress'>
          <div className='address-header'><p>Not:</p></div>
          <textarea
            className='address-section'
            placeholder={"Not Ekleyin..."}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          </div>
          
          <button
          className="order-button"
          onClick={() => onOrder({address: address, notes: notes, cartDynamic:cartDynamic})}
          disabled={address.length < 20 }
        >
          Order Now 

          <img className='whatsapp-icon' src={WhatsappIcon} alt="Order via Whatsapp" />
        </button>
        
        </div>

        
      </div>
      </div>
    </>
  );
};

export default ShoppingCartDrawer;
