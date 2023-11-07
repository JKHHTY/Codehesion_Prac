import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { Userlogin } from './Functions/UserLogin';

const Login =() =>{
    const navigation = useNavigate();

    const [formData, setData] = useState(
    {
        username: "",
        password: "",
    });

    const getEntry = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setData({
            ...formData,
            [name]: value,
        });
    };

    const scope = import.meta.env.VITE_SCOPE;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const url = import.meta.env.VITE_BASE_URL;
    const grantType = import.meta.env.VITE_GRANT_TYPE;
    const api = axios.create({
        baseURL: url,
    });

    const FormSubmit = (e: { preventDefault: () => void; }) => 
    {
        e.preventDefault();
        const data = new URLSearchParams();
        data.append("client_id", clientId);
        data.append("client_secret", clientSecret);
        data.append("scope", scope);
        data.append("username", formData.username);
        data.append("password", formData.password);
        data.append("grant_type", grantType);

        const config = {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}, 
        };

        console.log(data);
        //axios.post(url + '/connect/token', data, config)
        api.post('/connect/token', data, config)
        .then(function (response) {
            //localStorage.setItem('access_token', response.data.access_token);
            navigation("/home");
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    // const FormSubmit = async (e: { preventDefault: () => void; }) => 
    // {
    //     e.preventDefault();
    //     try{
    //         const res = await Userlogin(formData.username, formData.password);
    //         if(res && res.data.access_token)
    //         {
    //             navigation('/home');
    //         }
    //     }
    //     catch(error) {
    //         console.log("Login error", error);
    //     };

    // }
    
    

    return (
        <>
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={FormSubmit}> 
          <div className="form-group">
            <label htmlFor="username">Username</label><br/>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={getEntry}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label><br/>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={getEntry}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
        </>
      );
}

export default Login;