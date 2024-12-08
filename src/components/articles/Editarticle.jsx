import { Form, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Editarticle = () => {
  const [article, setArticle] = useState({
    ProductName: "",
    Description: "",
    Price: "",
    Stock: "",
    SCategoryID: "",
  });
  const [scategories, setScategories] = useState([]);
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const loadArticle = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/products/${id}`);
      const { ProductName, Description, Price, Stock, SCategoryID, imageart } =
        res.data;
      setArticle({ ProductName, Description, Price, Stock, SCategoryID });
      setFiles([
        {
          source: imageart,
          options: { type: "local" },
        },
      ]);
    } catch (error) {
      console.log("Error loading article:", error);
    }
  };

  const fetchScategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/s_categories");
      setScategories(res.data);
    } catch (error) {
      console.log("Error fetching subcategories:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/products/${id}`, article);
      navigate("/articles");
    } catch (error) {
      console.log("Error saving article:", error);
    }
  };

  const serverOptions = () => {
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ecommerce");
        data.append("cloud_name", "drh34ulo7");
        axios
          .post("https://api.cloudinary.com/v1_1/drh34ulo7/image/upload", data)
          .then((response) => response.data)
          .then((data) => {
            setArticle({ ...article, imageart: data.url });
            load(data);
          })
          .catch((uploadError) => {
            console.error("Error uploading file:", uploadError);
            error("Upload failed");
            abort();
          });
      },
    };
  };

  useEffect(() => {
    fetchScategories();
    loadArticle();
  }, []);

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <div className="text-center">
        <h2>Modifier un article</h2>
      </div>

      <Form>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom"
              value={article.ProductName}
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
            Enregistrer
          </button>
          &nbsp;&nbsp;
          <Link to="/articles">
            <button className="btn btn-warning btn-sm">
              <i className="fa-solid fa-left-long"></i> Annuler
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Editarticle;
