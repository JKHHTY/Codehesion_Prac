import { useEffect, useState } from "react";
//import { getCategories } from "./services/getCategories";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () =>{
  const navigation = useNavigate();

  const handleRegistrationClick = () =>{
    //console.log("hi");
    navigation("/register");
  }

  const [cate, setCate] = useState<{id:number,name:string}[]>([]);
  const cateURL = import.meta.env.VITE_BASE_URL + "/v1/admin/categories"

  useEffect(()=>{
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
          setCate(response.data.data);
          console.log(response);
        })
        .catch(function(error){
            console.log("Failed to fetch categories", error);
        });

    }
   
    getData();
  },[cate.length != 0])

  const output = cate.map((category) =>
    <li key={category.id} onClick={() => CategoryClick(category.id)} style={{ cursor: "pointer", textDecoration: "underline" }}>{category.name}</li>
  );

  const CategoryClick = (id: number) =>{
    console.log("hoi");
    navigation(`/Words/${id}`);
  }

  return (
      <>
        <div className="home-container">
          <h1>Home Page</h1>
          <button onClick={handleRegistrationClick}>Register New User</button>
          <h2>Categories:</h2>
          <ul>
            {output}
        </ul>
        </div>
      </>
  );
}

export default Home;