import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardMedia, Typography, Grid } from "@mui/material";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch categories
  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data);
      if (res.data.length > 0) {
        const firstCategory = res.data[0];
        setSelectedCategory(firstCategory);
        if (firstCategory.scategories.length > 0) {
          const firstSubcategory = firstCategory.scategories[0];
          setSelectedSubcategory(firstSubcategory);
          fetchProducts(firstSubcategory.id);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch products for a subcategory
  const fetchProducts = async (subcategoryId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/s_categories/${subcategoryId}`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      {/* Categories Section */}
      <Typography variant="h4" sx={{ margin: 3 }}>
        Catégories
      </Typography>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              sx={{
                maxWidth: 345,
                cursor: "pointer",
                border:
                  selectedCategory && selectedCategory.id === category.id
                    ? "2px solid #1976d2"
                    : "none",
              }}
              onClick={() => {
                setSelectedCategory(category);
                if (category.scategories.length > 0) {
                  const firstSubcategory = category.scategories[0];
                  setSelectedSubcategory(firstSubcategory);
                  fetchProducts(firstSubcategory.id);
                } else {
                  setSelectedSubcategory(null);
                  setProducts([]);
                }
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    category.category_image || "/static/images/placeholder.png"
                  }
                  alt={category.category_name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {category.category_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description || "Aucune description disponible."}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Subcategories Section */}
      <Typography variant="h4" sx={{ margin: 3 }}>
        {selectedCategory
          ? `Sous-catégories de "${selectedCategory.category_name}"`
          : "Sous-catégories"}
      </Typography>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {selectedCategory && selectedCategory.scategories.length > 0 ? (
          selectedCategory.scategories.map((subcategory) => (
            <Grid item xs={12} sm={6} md={4} key={subcategory.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: "pointer",
                  border:
                    selectedSubcategory &&
                    selectedSubcategory.id === subcategory.id
                      ? "2px solid #1976d2"
                      : "none",
                }}
                onClick={() => {
                  setSelectedSubcategory(subcategory);
                  fetchProducts(subcategory.id);
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      subcategory.SCategoryImage ||
                      "/static/images/placeholder.png"
                    }
                    alt={subcategory.SCategoryName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {subcategory.SCategoryName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ padding: 2 }}>
            Aucune sous-catégorie disponible pour cette catégorie.
          </Typography>
        )}
      </Grid>

      {/* Products Section */}
      <Typography variant="h4" sx={{ margin: 3 }}>
        {selectedSubcategory
          ? `Produits de "${selectedSubcategory.SCategoryName}"`
          : "Produits"}
      </Typography>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.ProductName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.Description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Prix: {parseFloat(product.Price).toFixed(3)}dt
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.Stock}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ padding: 2 }}>
            Aucun produit disponible pour cette sous-catégorie.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default MenuPage;
