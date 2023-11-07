import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Word=() =>{
  
    const navigation = useNavigate();
    const { id } = useParams();
    const [words, setWords] = useState<{ id: number; name: string; categories: { id: number ; name: string}[] }[]>([]);
    const [categories, setCategories] = useState<{id:number,name:string}[]>([]);
    const [fiLWords, setFilWords] = useState<{ id: number; name: string; categories: { id: number ; name: string }[] }[]>([]);
    const [filCategory, setFilCategory ] = useState<{id:number,name:string}[]>([]);

    const cateURL = import.meta.env.VITE_BASE_URL + "/v1/admin/categories";
    const wordURL = import.meta.env.VITE_BASE_URL + "/v1/admin/Words";

    useEffect(() => {
        async function getData() {
            const accessToken = localStorage.getItem("access_token");
    
            const config = {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
              }, 
            }
    
            //console.log(accessToken);
            const data = await axios.get(wordURL, config)
            .then(function(response) {
              //const data = response.data;
              setWords(response.data.data.items);
              //console.log(response);
            })
            .catch(function(error){
                console.log("Failed to fetch words", error);
            });  
        }
    
      getData();
      }, [words.length != 0]);

      useEffect(() => {
        async function getData() {
            const accessToken = localStorage.getItem("access_token");
    
            const config = {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
              }, 
            }
    
            //console.log(accessToken);
            const data = await axios.get(cateURL, config)
            .then(function(response) {
              //const data = response.data;
              setCategories(response.data.data);
              console.log(categories);
            })
            .catch(function(error){
                console.log("Failed to fetch words", error);
            });  
        }
    
      getData();
      }, [categories.length != 0]);

      useEffect(() => {
        const fil = words.filter((word) => word.categories.some((category) => category.id === Number(id)));
        setFilWords(fil);

        const cateFil = categories.filter((category) => category.id === Number(id));
        setFilCategory(cateFil);

      }, [categories,id, words])
  

      const categoryName = filCategory.length > 0 ? filCategory[0].name : "";

      const goBack = () =>{
        navigation("/home");
    }

    return (
        <>
          <div className="words-container">
            <button className="back-button" onClick={goBack}>
              &#8592; Back
            </button>
            <h1>{categoryName}</h1>
            <h2>Words:</h2>
            <ul>
              {fiLWords.map((words) => (
                <li key={words.id}>
                  {words.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      );
}
export default Word;