import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register =() => {
    const navigation = useNavigate();
    
    const goBack = () =>{
        navigation("/home");
    }
   
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        role: "",
    });

    const getEntry = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const url = import.meta.env.VITE_BASE_URL;
    const api = axios.create({
        baseURL: url,
    });

    const formSubmit = (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        const accessToken = localStorage.getItem("access_token");
        const data = {
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            role: formData.role,
        }

        console.log(accessToken);
        console.log(data);
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }, 
        }

        api.post('/v1/admin/Users', data, config)
        .then(function (response) {
            alert("Register success");
            navigation("/home"); 
        })
        .catch(function (error) {
           alert(JSON.stringify(error?.response?.data?.errors)); 
            
        });

    }
    

    return (
        <>
          <div className="register-container">
            <button className="back-button" onClick={goBack}>
              <b>Back</b>
            </button>
            <h1>Register Page</h1>
            <form onSubmit={formSubmit}>
              <div className="form-group">
                <label htmlFor="Name">Name</label><br/>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={getEntry}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname</label><br/>
                <input
                  type="surname"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={getEntry}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label><br/>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={getEntry}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label><br/>
                <input
                  type="role"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={getEntry}
                  required
                />
              </div>
              <button type="submit">Register</button>
            </form>
          </div>
        </>
      );
}
export default Register;