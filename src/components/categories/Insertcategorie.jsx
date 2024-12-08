import React, { useState } from 'react';
import axios from 'axios';
import "./categorie.css";
import { useNavigate } from 'react-router-dom';

const Insertcategorie = () => {
  const navigate = useNavigate(); // Pour la navigation après ajout
  const [categorie, setCategorie] = useState({}); // État pour stocker la nouvelle catégorie
  const [error, setError] = useState(''); // Gestion des erreurs

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation des champs
    if (!categorie.category_name || !categorie.category_image) {
      setError('Both fields are required'); // Si un champ est vide, affiche un message d'erreur
      return;
    }
    try {
      console.log(categorie)  
      await axios.post("http://localhost:8000/api/categories", categorie); // Envoi de la catégorie au serveur
      navigate("/categories"); // Redirige vers la liste des catégories après ajout
    } catch (error) {
      console.error(error);
      alert("Erreur! L'insertion a échoué.");
    }
  };
 
  return (
    <div className="form-container">
      <form className="categorie-form">
        <h2>Ajouter Catégorie</h2>

        <div className="form-group">
          <label htmlFor="Nom">Nom catégorie</label>
          <input
            type="text"
            id="reference"
            value={categorie.category_name}
            onChange={(e) => setCategorie({ ...categorie, category_name: e.target.value })}
            className="form-input"
            placeholder="Entrez nom catégorie"
          />
        </div>
  <div className="form-group">
          <label htmlFor="Nom">Description catégorie</label>
          <input
            type="text"
            id="reference"
            value={categorie.description}
            onChange={(e) => setCategorie({ ...categorie, description: e.target.value })}
            className="form-input"
            placeholder="Entrez nom catégorie"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="category_image"
            value={categorie.category_image}
            onChange={(e) => setCategorie({ ...categorie, category_image: e.target.value })}
            className="form-input"
            placeholder="Image"
          />
          {categorie.category_image ? <img src={categorie.category_image} alt="image" width="70" /> : null}
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affiche l'erreur si elle existe */}
        <button type="button" className="form-submit-button" onClick={handleSubmit}>Enregistrer</button>
      </form>
    </div>
  );
};

export default Insertcategorie;
