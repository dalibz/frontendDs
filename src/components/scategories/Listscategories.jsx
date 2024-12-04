import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Listscategories = () => {
  const [scategories, setScategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchScategories = async () => {
    try {
      const res = await axios.get("https://yourbackendurl/api/scategories");
      setScategories(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sous catégorie?")) {
      try {
        await axios.delete(`https://yourbackendurl/api/scategories/${id}`);
        setScategories(scategories.filter((scat) => scat.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchScategories();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h1>List of Sous Catégories</h1>
      <Link to="/scategories/add" className="btn btn-primary">
        Add Sous Catégorie
      </Link>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scategories.map((scat) => (
            <tr key={scat.id}>
              <td>{scat.name}</td>
              <td>{scat.description}</td>
              <td>
                <Link to={`/scategories/edit/${scat.id}`} className="btn btn-warning btn-sm">
                  Edit
                </Link>{" "}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(scat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listscategories;
