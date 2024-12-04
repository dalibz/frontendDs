import React from "react";

// Example data for categories and subcategories
const categories = [
  { id: 1, name: "Cuisine", subcategories: ["Entrées Froides", "Entrées Chaudes", "Les Pâtes", "Les Viandes"] },
  { id: 2, name: "Drinks", subcategories: ["Café", "Thé", "Jus de Fruits"] },
  { id: 3, name: "Chicha", subcategories: ["Tabac", "Aromatisé", "Saveurs"] },
  // Add more categories here...
];

const MenuPage = () => {
  return (
    <div className="menu-page">
      <h1>Menu</h1>

      {/* Render Categories */}
      <div className="categories">
        {categories.map((category) => (
          <div key={category.id} className="category-section">
            <h2>{category.name}</h2>
            {/* Render Subcategories */}
            <ul>
              {category.subcategories.map((subcategory, index) => (
                <li key={index}>{subcategory}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
