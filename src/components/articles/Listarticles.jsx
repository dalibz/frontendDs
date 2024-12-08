import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

  const Listarticles = () => {
  const [articles, setArticles] = useState([]);
  const [scategories, setScategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch articles and subcategories from the API
  const fetchArticles = async () => {
    try {
      setIsLoading(true);
        const [articlesRes, scategoriesRes] = await Promise.all([
        axios.get("http://localhost:8000/api/products"),
        axios.get("http://localhost:8000/api/s_categories"),
      ]);
      setArticles(articlesRes.data);
      setScategories(scategoriesRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(); // Fetch data when the component mounts
  }, []);

  // Handle article deletion
  const handleDelete = async (id) => {
    if (window.confirm("Etes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await axios.delete(`http://localhost:8000/api/products/${id}`);
        setArticles(articles.filter((article) => article.id !== id));
      } catch (error) {
        console.log("Error deleting article:", error);
      }
    }
  };

  // Find subcategory name by ID
  const getSubcategoryName = (id) => {
    const scategory = scategories.find((scat) => scat.id === id);
    return scategory ? scategory.SCategoryName : "Unknown";
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <center>
        <ReactLoading
          type="spinningBubbles"
          color="red"
          height={300}
          width={200}
        />
      </center>
    );
  }

  return (
    <div>
      {/* Add Article Button */}
      <Link to="/articles/add">
        <button className="btn btn-success">
          <i className="fa-solid fa-plus"></i> Ajouter
        </button>
      </Link>

      {/* Page Title */}
      <center>
        <h2>Liste des articles</h2>
      </center>

      {/* Articles Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Stock</th>
            <th>Subcategory</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.ProductName}</td>
              <td>{article.Description}</td>
              <td>{article.Price}</td>
              <td>{article.Stock}</td>
              <td>{getSubcategoryName(article.SCategoryID)}</td>
              <td>
                <Link to={`/article/edit/${article.id}`}>
                  <button className="btn btn-warning btn-sm">
                    <i className="fa-solid fa-pen-to-square"></i> Update
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(article.id)}
                >
                  <i className="fa-solid fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listarticles;
