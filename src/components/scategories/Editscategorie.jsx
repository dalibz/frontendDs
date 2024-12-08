import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Editscategorie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scategorie, setScategorie] = useState({ name: "", description: "" });

  const fetchScategorie = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/s_categories/${id}`);
      setScategorie(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScategorie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/s_categories/${id}`, scategorie);
      navigate("/scategories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Edit Sous Catégorie</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={scategorie.SCategoryName}
            onChange={(e) =>
              setScategorie({ ...scategorie, SCategoryName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            required
            id="SCategoryImage"
            value={scategorie.SCategoryImage}
            onChange={(e) =>
              setScategorie({ ...scategorie, SCategoryImage: e.target.value })
            }
            className="form-input"
            placeholder="Image"
          />
          {scategorie.SCategoryImage ? (
            <img src={scategorie.SCategoryImage} alt="image" width="70" />
          ) : null}
        </div>
        <button type="submit" className="btn btn-success mt-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default Editscategorie;
