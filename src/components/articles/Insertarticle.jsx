import { Form, Col,Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import { FilePond,registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation' 
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
const Insertarticle = () => {
  const [article, setArticle] = useState([]);
  const [scategories, setScategories] = useState([]);
  const[isLoading,setisLoading]=useState(true)
  const [files, setFiles] = useState([]);
  const navigate=useNavigate();
  const fetchscategories=async()=>{
    try{
      const res= await axios.get("http://localhost:8000/api/s_categories")
      setScategories(res.data)
      setisLoading(false)
    }
    catch(error){
      console.log(error)
    }
  }
  const handleSave=async(e)=>{
    try{
      e.preventDefault();
      console.log(article)
      await axios.post("http://localhost:8000/api/products",article)
      .then(()=>{navigate("/articles")

      })
    }catch(error){
      console.log(error)
    }
  }
  

  useEffect(()=>{
    fetchscategories()
  },[])
  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shdow">
      <div className="text-center">
        <h2>Insérer un article</h2>
      </div>

      <Form>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="name"
              value={article.Description}
              onChange={(e) =>
                setArticle({ ...article, ProductName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={article.Description}
              onChange={(e) =>
                setArticle({ ...article, Description: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Stock"
              value={article.Stock}
              onChange={(e) =>
                setArticle({ ...article, Stock: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type="number"
              placeholder="Prix"
              value={article.Price}
              onChange={(e) =>
                setArticle({ ...article, Price: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Sous Categorie</Form.Label>
            <Form.Control
              as="select"
              placeholder="Sous Categorie"
              value={article.SCategoryID}
              onChange={(e) =>
                setArticle({ ...article, SCategoryID: e.target.value })
              }
            >
              {scategories.map((scat) => (
                <option key={scat.id} value={scat.id}>
                  {scat.SCategoryName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-success btn-sm"
            onClick={(e) => handleSave(e)}
          >
            {" "}
            Enregistrer
          </button>
          &nbsp;&nbsp;
          <Link to="/articles">
            <button className="btn btn-warning btn-sm">
              <i className="fa-solid fa-left-long"></i>
              Annuler
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
export default Insertarticle
