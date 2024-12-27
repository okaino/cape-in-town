import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import store from '../store/store';
import "./Header.css"
import ShoppingCartDrawer from "./ShoppingCartDrawer";
import CapeLogo from "../image/logo.png"

const Header = () => {
  const count = useSelector((state) => state.products);
  const [showCartModel, setshowCartModel] = useState(false)
  const [counter, setCounter] = useState(0)
  //const cartCount = count.length;
  const cartCount = count.reduce((total, item) => total + item.quantity, 0)
  const navigate = useNavigate();
  const asdas = () => {
    console.log(count)

  }

  const wpFunc = async (data) => {
    try {
      console.log(data)
      const cart = data
      const response = await axios.post("http://localhost:3000/sendCart", {cart});
      const { whatsappUrl } = response.data;
      window.open(whatsappUrl,  "_blank");
    } catch (error) {
      console.error("Error generating WhatsApp URL:", error);
      alert("Failed to send order. Please try again.");
    }
  }
  return (
    <header className="navbar">
      <div></div>
      <img src={CapeLogo} alt="Cape In Town" className="card_logo" onClick={() => navigate("/")} />
      <nav>
        <div className="cart-button">
          {cartCount > 0 ?
            <div>
              <div className="cart-counter"><p>{cartCount}</p></div>
            </div>
            : <div>
            </div>
          }
          <button className="navbar-button" onClick={() => {
            setshowCartModel(!showCartModel)

            asdas()
          }}>🛒</button>
        </div>
      </nav>
      {
        showCartModel ? <ShoppingCartDrawer onOrder={(data) => wpFunc(data)} /> : null
      }

    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "1rem",
    textAlign: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    margin: "0 10px",
  },
};

export default Header;
