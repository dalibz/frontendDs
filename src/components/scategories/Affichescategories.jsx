import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Affichescategories = ({ scategories, setScategories }) => {
  const [loading, setLoading] = useState(false); // État pour gérer le chargement de la suppression
  const navigate = useNavigate();

  // Fonction pour supprimer une catégorie
  const deleteScategorie = async (id) => {
    // Confirmation avant suppression
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    setLoading(true); // Démarre l'état de chargement
    try {
      await axios.delete(`http://localhost:8000/api/s_categories/${id}`);
      setScategories(scategories.filter((cat) => cat.id !== id)); // Mise à jour de la liste des catégories après suppression
      console.log("Successfully deleted!");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression");
    } finally {
      setLoading(false); // Arrête le chargement
    }
  };

  // Définir les colonnes du tableau
  const columns = [
    {
      accessorKey: "SCategoryImage",
      header: "Image",
      // Affiche l'image de la catégorie
      Cell: ({ cell }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            alt=""
            width={200}
            height={80}
            src={cell.getValue()}
            loading="lazy"
            style={{ borderRadius: "5%" }}
          />
        </Box>
      ),
    },
    {
      accessorKey: "SCategoryName",
      header: "SCategoryName",
      size: 100,
    },
    {
      accessorKey: "_id",
      header: "Actions",
      size: 10,
      // Boutons pour modifier et supprimer
      Cell: ({ cell }) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <Button
            onClick={() => {
              navigate(`/scategories/edit/${cell.row.original.id}`);
            }} // Redirige vers la page d'édition
            variant="contained"
            color="warning"
            style={{ fontSize: "20px", padding: "12px 24px" }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <Button
            onClick={() => {
              deleteScategorie(cell.row.original.id);
            }} // Supprime la catégorie
            variant="contained"
            color="error"
            style={{ fontSize: "20px", padding: "12px 24px" }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <i className="fa fa-trash"></i>
            )}
          </Button>
        </div>
      ),
    },
  ];

  // Utilisation de la table de Material React Table
  const table = useMaterialReactTable({
    columns,
    data: scategories, // Données de catégories
  });

  return (
    <div className="container">
      {scategories && scategories.length > 0 && (
        <MaterialReactTable table={table} />
      )}
    </div>
  );
};

export default Affichescategories;
