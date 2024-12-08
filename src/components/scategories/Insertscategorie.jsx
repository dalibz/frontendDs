import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./scategories.css";
const Insertscategorie = () => {
  const [scategorie, setScategorie] = useState({
    SCategoryName: "",
    CategoryID:1,SCategoryImage: "",
  });
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  
 const fetchcategories = async () => {
   try {
     const res = await axios.get("http://localhost:8000/api/categories");
     setCategories(res.data);
     setisLoading(false);
   } catch (error) {
     console.log(error);
   }
 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(scategorie)
      await axios.post("http://localhost:8000/api/s_categories", scategorie);
      navigate("/scategories");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchcategories();
  }, []);
  return (
    <div>
      <h1>Add Sous Catégorie</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setScategorie({ ...scategorie, SCategoryName: e.target.value })
            }
          />
          {/* <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              id="category_image"
              value={categorie.category_image}
              onChange={(e) =>
                setScategorie({ ...categorie, category_image: e.target.value })
              }
              className="form-input"
              placeholder="Image"
            />
            {categorie.category_image ? (
              <img src={categorie.category_image} alt="image" width="70" />
            ) : null}
          </div> */}
          <Form.Label>Categorie</Form.Label>
          <Form.Control
            as="select"
            placeholder="Sous Categorie"
            onChange={(e) =>
              setScategorie({ ...scategorie, CategoryID: e.target.value })
            }
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </Form.Control>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="category_image"
            onChange={(e) =>
              setScategorie({ ...scategorie, SCategoryImage: e.target.value })
            }
            className="form-input"
            placeholder="Image"
          />

          <img
            src={
              scategorie.SCategoryImage != undefined
                ? scategorie.SCategoryImage
                : ""
            }
            alt="image"
            width="70"
          />
        </div>

        <button type="submit" className="btn btn-success mt-2">
          Add
        </button>
      </form>
    </div>
  );
};

export default Insertscategorie;
