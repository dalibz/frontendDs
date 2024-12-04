import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./categorie.css";
import { useParams, useNavigate } from 'react-router-dom';

const Editcategorie = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID de la catégorie depuis l'URL
  const [categorie, setCategorie] = useState({}); // État pour stocker la catégorie à modifier
  const [error, setError] = useState(''); // État pour gérer les erreurs

  // Fonction pour charger la catégorie à modifier
  const loadcategorie = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/categories/${id}`);
      setCategorie(response.data); // Charge les données de la catégorie
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadcategorie(); // Charge la catégorie dès que le composant est monté
  }, []);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation des champs
    if (!categorie.category_name || !categorie.category_image) {
      setError('Both fields are required'); // Si un champ est vide, on affiche une erreur
      return;
    }
    try {
      await axios.put(`http://localhost:8000/api/categories/${id}`, categorie);
      navigate("/categories"); // Redirige vers la liste des catégories après modification
    } catch (error) {
      console.error(error);
      alert("Erreur! La mise à jour a échoué.");
    }
  };

  return (
    <div className="form-container">
      <form className="categorie-form">
        <h2>Modifier Catégorie</h2>
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
          <label htmlFor="image">Image</label>
          <input
            type="text"
            required
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

export default Editcategorie;
