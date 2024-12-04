import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

const Listarticles = () => {
  const [articles, setArticles] = useState([]);
  const[isLoading,setisLoading]=useState(true)
  const fetcharticles = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/articles");
      setArticles(res.data);
      setisLoading(false)

    } catch (error) {
      console.log(error); 
    }
    
  };
  /*const fetchscategories=async()=>{
    try{
      const res= await axios.get("http://localhost:8000/api/scategorie")
      setScategories(res.data)
      setisLoading(false)
    }
    catch(error){
      console.log(error)
    }
  }
*/
  useEffect(() => {
    fetcharticles();
    fetchscategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Etes-vous sûr de vouloir supprimer")) {
      try {
        await axios.delete(`http://localhost:8000/api/articles/${id}`);
        setArticles(articles.filter(art => art.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };
if (isLoading){
  return(
   <center> <ReactLoading type="spinningBubbles" color="red"height={300} width={200} /></center>
  )
}

  return (
    <div>
      <Link to="/articles/add">
        <button className="btn btn-success">
          <i className="fa-solid fa-plus"></i> Ajouter
        </button>
      </Link>
      <center>
        <h2>Liste des articles</h2>
      </center>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Réference</th>
            <th>Désignation</th>
            <th>Marque</th>
            <th>Stock</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            articles.map((art, index) =>
              <tr key={index}>
                <td>{art.reference}</td>
                <td>{art.designation}</td>
                <td>{art.marque}</td>
                <td>{art.qtestock}</td>
                <td>{art.prix}</td>
                <td>
                  <img src={art.imageart} width={100} height={100} alt={art.reference} />
                </td>
                <td>
                <Link to ={`/article/edit/${art.id}`}>
                  <button className="btn btn-warning btn-sm">
                    <i className="fa-solid fa-pen-to-square"></i> Update
                  </button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(art.id)}>
                    <i className="fa-solid fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default Listarticles;
