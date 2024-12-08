import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Affichescategories from "./Affichescategories";

const Listscategories = () => {
  const [scategories, setScategories] = useState([]); // État pour stocker la liste des catégories

  // Fonction pour récupérer les catégories depuis le serveur
  const getscategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/s_categories");
      setScategories(res.data); // Met à jour l'état avec les catégories récupérées
    } catch (error) {
      console.log(error); // En cas d'erreur, l'afficher dans la console
    }
  };

  useEffect(() => {
    getscategories(); // Charge les catégories au premier rendu du composant
  }, []);

  return (
    <div>
      <Button variant="contained" style={{ backgroundColor: "black" }}>
        <Link
          to="/scategories/add"
          style={{ color: "white", textDecoration: "none" }}
        >
          <i className="fa-solid fa-plus-square"></i> Nouveau
        </Link>
      </Button>
      <h2>Liste des catégories</h2>
      {/* Affiche les catégories en utilisant le composant Affichecategories */}
      <Affichescategories
        scategories={scategories}
        setScategories={setScategories}
      />
    </div>
  );
};

export default Listscategories;
