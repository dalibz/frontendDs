import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

const Listarticlescard = () => {
    const [articles, setArticles] = useState([]);
    const[isLoading,setisLoading]=useState(true)
    const fetcharticles = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        setArticles(res.data);
        setisLoading(false)
  
      } catch (error) {
        console.log(error);
      }
    };
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
  
    useEffect(() => {
      fetcharticles();
      fetchscategories();
    }, []);
    if (isLoading){
      return(
       <center> <ReactLoading type="spinningBubbles" color="red"height={300} width={200} /></center>
      )
    }
  
    return (
      <div>
       <Affichearticles articles={articles}/> 
      </div>
    )
  }
  export default Listarticlescard