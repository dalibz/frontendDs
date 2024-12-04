import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Insertscategorie = () => {
  const [scategorie, setScategorie] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://yourbackendurl/api/scategories", scategorie);
      navigate("/scategories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add Sous Catégorie</h1>
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
          Add
        </button>
      </form>
    </div>
  );
};

export default Insertscategorie;
