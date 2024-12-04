import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Viewscategorie = () => {
  const { id } = useParams();
  const [scategorie, setScategorie] = useState(null);

  const fetchScategorie = async () => {
    try {
      const res = await axios.get(`https://yourbackendurl/api/scategories/${id}`);
      setScategorie(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScategorie();
  }, [id]);

  if (!scategorie) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h1>Sous Catégorie Details</h1>
      <p><strong>Name:</strong> {scategorie.name}</p>
      <p><strong>Description:</strong> {scategorie.description}</p>
    </div>
  );
};

export default Viewscategorie;
