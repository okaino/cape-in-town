import React from "react";
import PropTypes from "prop-types"; // For prop type validation
import "./CardStyle.css";
import Pizzacategory from "../image/yandan-margi.jpeg"
import HamburgerCategory from "../image/oklahoma-burger.jpeg"
import DrinksCategory from "../image/colaicecek.jpeg"
import SnackCategory from "../image/tavuk-ketegori.png"

const CategoryCard = ({ categoryName, onClick }) => { 
    CategoryCard.propTypes = {
        categoryName: PropTypes.string.isRequired, // categoryName must be a string
        onClick: PropTypes.func.isRequired, // onClick must be a function
    };
    
    const handleCategoryImage = (category) => {
        // Add your navigation logic here (e.g., using react-router)
        switch (category) {
            case "To Share":
                return HamburgerCategory;
                break;

            case "Pizzas":
                return Pizzacategory;
                break;

            case "Drinks":
                return DrinksCategory;
                break;

            case "Snacks":
                return SnackCategory;
                break;

        }
    };
    return (
        <div className="card" onClick={onClick}>
            <div className="card__image-container">
                <img src={handleCategoryImage(categoryName)} alt={`${categoryName}`} className="card__image" />
            </div>
            <div className="card__content">
                <p className="card__title">{categoryName}</p>
                <p className="card__description">
                    Click to explore more in the {categoryName} category.
                </p>
            </div>
        </div>
    );
};

export default CategoryCard;
