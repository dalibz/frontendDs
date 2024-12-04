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
      const res= await axios.get("http://localhost:8000/api/scategorie")
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
      await axios.post("http://localhost:8000/api/articles",article)
      .then(()=>{navigate("/articles")

      })
    }catch(error){
      console.log(error)
    }
  }
  const serverOptions = () => { ;
    return {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
    console.log(file)
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Ecomerce');
    data.append('cloud_name', 'dpbnibi4c');
        data.append('publicid', file.name);
        axios.post('https://api.cloudinary.com/v1_1/dpbnibi4c/image/upload', data)
        .then((response) => response.data)
        .then((data) => {
        console.log(data);
        setArticle({...article,imageart:data.url}) ;
        load(data);
        })
        .catch((error) => {
        console.error('Error uploading file:', error);
        error('Upload failed');
        abort();
        });
        },
        };
        };

  useEffect(()=>{
    fetchscategories()
  },[])
  return (
    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shdow'>

      <div className="text-center">
        <h2>Insérer un article</h2>
      </div>

    <Form>
      <Row className="mb-2">
      <Form.Group as={Col} md="6">
        <Form.Label>Réference</Form.Label>
        <Form.Control type="text" placeholder="Réference" 
         value={article.reference}
         onChange={(e)=>setArticle({...article,reference:e.target.value})}
         />
      </Form.Group>
      <Form.Group as={Col} md="6">
        <Form.Label>Désignation</Form.Label>
        <Form.Control type="text" placeholder="Désignation" 
         value={article.designation}
         onChange={(e)=>setArticle({...article,designation:e.target.value})}
         />
      
      </Form.Group>
      </Row>
      <Row className="mb-2">
      <Form.Group as={Col} md="6">
        <Form.Label>Marque</Form.Label>
        <Form.Control type="text" placeholder="Marque" 
         value={article.marque}
         onChange={(e)=>setArticle({...article,marque:e.target.value})}
         />
      </Form.Group>
      <Form.Group as={Col} md="6">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" placeholder="Stock" 
         value={article.qtestock}
         onChange={(e)=>setArticle({...article,qtestock:e.target.value})}
         />
      </Form.Group>
      </Row>
      <Row className="mb-2">
      <Form.Group as={Col} md="6">
        <Form.Label>Prix</Form.Label>
        <Form.Control type="number" placeholder="Prix" 
         value={article.prix}
         onChange={(e)=>setArticle({...article,prix:e.target.value})}
         />
      </Form.Group>
      <div className="form-group">
        <label htmlFor="prix">Image</label>
        <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
        <FilePond
        files={files}
        acceptedFileTypes="image/*"
        onupdatefiles={setFiles}
        allowMultiple={true}
        server={serverOptions()}
        name="file"
        />
        </div>
        </div>
      </Row>
      <Row className="mb-2">
    <Form.Group as={Col} md="6">
    <Form.Label>Sous Categorie</Form.Label>
    <Form.Control
        as="select"
        placeholder="Sous Categorie"
        value={article.scategorieID}
        onChange={(e) => setArticle({ ...article, scategorieID: e.target.value })}
    >
        {scategories.map((scat) => (
            <option key={scat.id} value={scat.id}>{scat.nomscategorie}</option>
        ))}
    </Form.Control>
      </Form.Group>

      </Row>
      <div className='d-flex justify-content-end'>

      <button className="btn btn-success btn-sm" onClick={(e)=>handleSave(e)}> Enregistrer</button>
      &nbsp;&nbsp;
      <Link to="/articles">
      <button className="btn btn-warning btn-sm">
      <i className="fa-solid fa-left-long"></i>
       Annuler</button>
      </Link>
      </div>
    </Form>
    </div>
  )
}
export default Insertarticle
