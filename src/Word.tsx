import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Word=() =>{
    const navigation = useNavigate();
    const { id } = useParams();
    const [words, setWords] = useState<{ id: number; name: string; categories: { id: number ; name: string}[] }[]>([]);
    const [categories, setCategories] = useState<{id:number,name:string}[]>([]);
    const [filteredWords, setFilteredWords] = useState<{ id: number; name: string; categories: { id: number ; name: string }[] }[]>([]);
    const [filteredCategory, setFilteredCategory ] = useState<{id:number,name:string}[]>([]);

    const cateURL = import.meta.env.VITE_APP_BASE_URL + "/v1/admin/categories";
    const wordURL = import.meta.env.VITE_APP_BASE_URL + "/v1/admin/Words";

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
              setCategories(response.data);
              console.log(response);
            })
            .catch(function(error){
                console.log("Failed to fetch categories", error);
            });

            const temp = await axios.get(wordURL, config)
            .then(function(response)
            {
                setWords(response.data);
            })
            .catch(function(error){
                console.log("Fail to fetch words", error);
            })
        
        }
    
        getData();
      }, [words.length != 0 || categories.length != 0]);

      useEffect(() => {
        const filtered = words.filter((word) => word.categories.some((category) => category.id === Number(id)));
        setFilteredWords(filtered);
    
        const cFiltered = categories.filter((category) => category.id === Number(id));
        setFilteredCategory(cFiltered);
      }, [categories, id, words]);

      const categoryName = filteredCategory.length > 0 ? filteredCategory[0].name : "";

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
              {filteredWords.map((word) => (
                <li key={word.id}>
                  {word.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      );
}
export default Word;