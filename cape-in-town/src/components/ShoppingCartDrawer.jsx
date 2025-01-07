import React, { useState, useMemo, useEffect } from 'react';
import store, { updateAllProducts, deleteCart } from '../store/store';
import { useSelector } from 'react-redux';
import OklahomaCheeseHamburger from "../image/oklahoma-cheese.jpg"
import OklahomaHamburger from "../image/oklahoma-cheese.jpg"
import ChickenBurger from "../image/chicken-burger.jpg"
import WhatsappIcon from "../image/whatsapp.png"
// Import your category images here
import DrinksCategory from "../image/icecek-kategori.png"
import SnackCategory from "../image/chicken-tenders.jpg"
import MargheritaPizza from "../image/margherita-pizza.jpg"
import SebzeliPizza from "../image/sebzeli-pizza.jpg"
import EtliPizza from "../image/etli-pizza.jpg"

import CocaCola from "../image/coca-cola.jpg"
import CocaColaZero from "../image/coca-cola-zero.jpg"
import Fanta from "../image/fanta.jpg"
import FuseKarpuz from "../image/fuse-karpuz.jpg"
import Redbull from "../image/redbull.jpg"
import FuseLimon from "../image/fuse-limon.jpg"
import FuseMangoAn from "../image/fuse-mangoan.jpg"
import FuseSefta from "../image/fuse-sefta.jpg"
import Su from "../image/su.jpg"
import Sprite from "../image/sprite.jpg"
import Sade from "../image/sade.jpg"
import './ShoppingCartDrawer.css';

const ShoppingCartDrawer = ({ onOrder }) => {
  const count = useSelector((state) => state.products);
  const [cartDynamic, setCartDynamic] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState("");

  // Calculate total price
  const totalPrice = useMemo(() => {
    return cartDynamic.reduce((total, item) => {
      const itemTotal = item.extraPatty
        ? (item.price + item.extraPatty * 50) * item.quantity
        : item.extraChick
          ? (item.price + item.extraChick * 30) * item.quantity
          : item.price * item.quantity;
      return total + itemTotal;
    }, 0);
  }, [cartDynamic]);

  useEffect(() => {
    setCartDynamic([...count]); // Initialize cartDynamic with products state
  }, [count]);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleQuantityChange = (index, delta) => {
    if (cartDynamic[index].quantity == 1 && delta == -1) {
      setCartDynamic((prevCart) => {
        const updatedCart = prevCart.filter((_, i) => i !== index);
        store.dispatch(updateAllProducts(updatedCart));
        return updatedCart;
      });
    }
    else {
      setCartDynamic((prevCart) => {
        const updatedCart = prevCart.map((item, i) =>
          i === index
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        );
        store.dispatch(updateAllProducts(updatedCart));
        return updatedCart;
      });
    }
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length < 20) {
      setError("Minimum 20 karakter giriniz.");
    } else {
      setError("");
    }
  };

  const handleCategoryImage = (foodName) => {
    switch (foodName) {
      case "Oklahoma Cheese Burger":
        return OklahomaCheeseHamburger;
      case "Oklahoma Hamburger":
        return OklahomaHamburger;
      case "Chicken Burger":
        return ChickenBurger;
      case "Chicken Tenders":
      case "Baharatlı Patates Cipsi":
        return SnackCategory;
      case "Margherita":
        return MargheritaPizza;
      case "Sebzeli":
        return SebzeliPizza;
      case "Etli":
        return EtliPizza;
      case "Coca Cola":
        return CocaCola;
        break;

      case "Coca Cola Zero":
        return CocaColaZero;
        break;

      case "Fanta":
        return Fanta;
        break;

      case "Fuse Tea Karpuz":
        return FuseKarpuz;
        break;


      case "Sprite":
        return Sprite;
        break;

      case "Fuse Tea Limon":
        return FuseLimon;
        break;

      case "Fuse Tea Mango Ananas":
        return FuseMangoAn;
        break;

      case "Fuse Tea Şeftali":
        return FuseSefta;
        break;
      case "Redbull":
        return Redbull;
        break;

      case "Su":
        return Su;
        break;

      case "Soda":
        return Sade;
        break;

      default:
        return null;
    }
  };

  return (
    <>
      {isOpen ? (
        <button className="toggle-button" onClick={toggleDrawer}>X</button>
      ) : null}
      <div className="screen-wide">
        <div className={`drawer ${isOpen ? 'open' : ''}`}>
          <div className="cart-header">
            <h2>Sepetim</h2>
          </div>
          <div className="cart-items">
            {cartDynamic.map((item, index) => (
              <div key={index} className="cart-item-row">
                <div className="cart-item">
                  <img src={handleCategoryImage(item.name)} alt={item.name} className="item-image" />
                  <span className="item-name">{item.name}</span>
                </div>
                <div className="cart-item-info">
                  <span className="item-price">
                    {item.extraPatty
                      ? (item.price + item.extraPatty * 50) * item.quantity
                      : item.extraChick
                        ? (item.price + item.extraChick * 30) * item.quantity
                        : item.price * item.quantity} TL
                  </span>
                  {(item.extraPatty || item.extraChick) && (
                    <span className="item-name">
                      Extra {item.extraPatty
                        ? `${item.extraPatty} x Köfte(120gr.)`
                        : item.extraChick
                          ? `${item.extraChick} x Tavuk(120gr.)`
                          : ""}
                    </span>
                  )}
                  <div className="item-ops-button">
                    <button onClick={() => handleQuantityChange(index, -1)} className="item-quantity">-</button>
                    <p className="item-quantity-num">{item.quantity}</p>
                    <button onClick={() => handleQuantityChange(index, 1)} className="item-quantity">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">

            <div className="adress">
              <div className="address-header"><p>Adres*:</p></div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <textarea
                className="address-section"
                placeholder={"Adres*..."}
                value={address}
                onChange={(e) => handleTextChange(e)}
              />
            </div>
            <div className="adress">
              <div className="address-header"><p>Not:</p></div>
              <textarea
                className="address-section"
                placeholder={"Not Ekleyin..."}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="total-price">
              <h3>Toplam Tutar: {totalPrice} TL</h3>
            </div>
            <button
              className="order-button"
              onClick={() => onOrder({ address, notes, cartDynamic, totalPrice })}
              disabled={address.length < 20}
            >
              Sipariş Ver
              <img className="whatsapp-icon" src={WhatsappIcon} alt="Order via Whatsapp" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartDrawer;
