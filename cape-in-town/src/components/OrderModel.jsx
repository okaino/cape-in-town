import React, { useState } from "react";
import store, { addProduct  } from '../store/store';
import "./OrderModel.css"
const OrderModel = ({ food, isOpen, onClose, onAddToCart, photo }) => {
  const [extraPatty, setExtraPatty] = useState("");
  const [extraChick, setExtraChick] = useState("");
  const initialQuantity = 1
  if (!isOpen) return null;

  const handleAddToCart = () => {
    const selectedItem = {
      ...food,
      extraPatty,
      quantity:initialQuantity,
      extraChick
    };
    store.dispatch(addProduct ({
      ...food,
      extraPatty,
      quantity:initialQuantity,
      extraChick
    }));
    //console.log(store.getState().products)
    onAddToCart(selectedItem);  
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
      >
        <div className="modal-header">
          <h2>{food.name}</h2>

          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="food-image">
            <img src={photo} alt={food.name} />
          </div>
          <div className="food-details">
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p>Price: {food.price}₺</p>
            
              {food.type == "meat" ? 
              <div className="extra-patty">
                <label htmlFor="extraPatty">Extra Köfte:</label>
              <select
              className="extra-select"
                id="extraPatty"
                value={extraPatty}
                onChange={(e) => setExtraPatty(e.target.value)}
              >
                <option value="">Hiçbiri</option>
                <option value="1">1 Extra Köfte(120gr.)</option>
                <option value="2">2 Extra Köfte(120gr.)</option>
              </select>
              </div>
              : food.type == "chicken" ? 
              <div className="extra-patty">
                <label htmlFor="extraChick">Extra Pane Tavuk:</label>
              <select
              className="extra-select"
                id="extraChick"
                value={extraChick}
                onChange={(e) => setExtraChick(e.target.value)}
              >
                <option value="">Hiçbiri</option>
                <option value="1">1 Extra Pane Tavuk</option>
                <option value="2">2 Extra Pane Tavuk</option>
              </select>
              </div>
              : 
              null
              }
              
            
          </div>
        </div>
        <div className="modal-footer">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Sepete ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModel;
