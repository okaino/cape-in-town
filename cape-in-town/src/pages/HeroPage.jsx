import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import "../App.css"

const HeroPage = () => {
    const navigate = useNavigate();

  const categories = [
    { name: "To Share", path: "/category/toShare", key:0 },
    { name: "Pizzas", path: "/category/pizzas", key:1 },
    { name: "Drinks", path: "/category/drinks", key:3 },
  ];
  const handleCategoryClick = (category) => {
    navigate(category)
  };


    return (
        <div className="container">
        <h2>CAPE IN TOWN</h2>
        <h3>KATEGORİLER</h3>
        <div className="hero-buttons">
          {categories.map((category,key) => (
            <CategoryCard
            key={key}
            categoryName={category.name}
            imagePath={category.imagePath}
            onClick={() => handleCategoryClick(category.path)}
          />
          ))}
        </div>
      </div>
    );
  };
  
  export default HeroPage;