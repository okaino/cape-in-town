import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import store, { addProduct } from "../store/store";
import OrderModel from "../components/OrderModel"
import "./CategoryPage.css"


import Pizzacategory from "../image/margherita.jpg"

import OklahomaCheeseHamburger from "../image/oklahoma-cheese.jpg"
import OklahomaHamburger from "../image/oklahoma-cheese.jpg"
import ChickenBurger from "../image/chicken-burger.jpg"
import MargheritaPizza from "../image/margherita-pizza.jpg"
import SebzeliPizza from "../image/sebzeli-pizza.jpg"
import EtliPizza from "../image/etli-pizza.jpg"
import SnackCategory from "../image/chicken-tenders.jpg"

import CocaCola from "../image/coca-cola.jpg"
import CocaColaZero from "../image/coca-cola-zero.jpg"
import Fanta from "../image/fanta.jpg"
import FuseKarpuz from "../image/fuse-karpuz.jpg"
import Redbull from "../image/redbulll.jpg"
import FuseLimon from "../image/fuse-limon.jpg"
import FuseMangoAn from "../image/fuse-mangoan.jpg"
import FuseSefta from "../image/fuse-sefta.jpg"
import Su from "../image/su.jpg"
import Sprite from "../image/sprite.jpg"
import Sade from "../image/sade.jpg"

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL params
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderModel, setOrderModel] = useState(false);
  const [selectedFood, setselectedFood] = useState(null)
  const openOrderModel = (food) => {
    setOrderModel(true)
    setselectedFood(food)
  }
  const handleAddToCart = (item) => {
    console.log("Added to cart:", item);
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

      case "Margherita":
        return MargheritaPizza;
        break;

      case "Sebzeli":
        return SebzeliPizza;
        break;

      case "Etli":
        return EtliPizza;
        break;

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

      case "Sprite":
        return Sprite;
        break;

      case "Su":
        return Su;
        break;

      case "Soda":
        return Sade;
        break;

    }
  };
  useEffect(() => {
    // Fetch food data based on category
    const fetchFoods = async () => {
      try {
        const response = await axios.post("https://cape-in-town-server.vercel.app/foods", {
          category,
        });
        setFoods(response.data); // Set the fetched data
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchFoods();
  }, [category]);

  return (
    <div className="food-card">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : foods.length > 0 ? (
        <div className="food-list">
          {foods.map((food) => (
            <div key={food.id} className="food-info">

              <img src={handleCategoryImage(food.name)} alt={`${food.name}`} />
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <p><strong>Fiyat:</strong> {food.price}₺</p>
              {/* <p><strong>Type:</strong> {food.type}</p> */}
              <div className="cart-container">
                <button onClick={() => openOrderModel(food)}><b>Sepete Ekle</b> 🛒</button>
              </div>
            </div>
          ))}

        </div>
      ) : (
        <p>No foods available in this category.</p>
      )}
      {orderModel ?
        <OrderModel
          food={selectedFood}
          isOpen={orderModel}
          onClose={() => setOrderModel(false)}
          photo={(handleCategoryImage(selectedFood.name))}
          onAddToCart={handleAddToCart}
        />
        : <div></div>
      }

    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
  },
  foodList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
  },
  foodCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
};

export default CategoryPage;
