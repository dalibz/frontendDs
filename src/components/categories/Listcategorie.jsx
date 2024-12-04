import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Affichecategories from './Affichecategories';

const Listcategories = () => {
  const [categories, setCategories] = useState([]); // État pour stocker la liste des catégories

  // Fonction pour récupérer les catégories depuis le serveur
  const getcategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data); // Met à jour l'état avec les catégories récupérées
    } catch (error) {
      console.log(error); // En cas d'erreur, l'afficher dans la console
    }
  };

  useEffect(() => {
    getcategories(); // Charge les catégories au premier rendu du composant
  }, []);

  return (
    <div>
      <Button variant="contained" style={{ backgroundColor: 'black' }}>
        <Link to="/categories/add" style={{ color: 'white', textDecoration: 'none' }}>
          <i className="fa-solid fa-plus-square"></i> Nouveau
        </Link>
      </Button>
      <h2>Liste des catégories</h2>
      {/* Affiche les catégories en utilisant le composant Affichecategories */}
      <Affichecategories categories={categories} setCategories={setCategories} />
    </div>
  );
};

export default Listcategories;
