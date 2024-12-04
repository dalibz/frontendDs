import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Editscategorie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scategorie, setScategorie] = useState({ name: "", description: "" });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://yourbackendurl/api/scategories/${id}`, scategorie);
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
            value={scategorie.name}
            onChange={(e) => setScategorie({ ...scategorie, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={scategorie.description}
            onChange={(e) =>
              setScategorie({ ...scategorie, description: e.target.value })
            }
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success mt-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default Editscategorie;
