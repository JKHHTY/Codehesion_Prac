import axios from 'axios';

const scope = import.meta.env.VITE_SCOPE;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const clientId = import.meta.env.VITE_CLIENT_ID;
const grantType = import.meta.env.VITE_GRANT_TYPE;
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

export const Userlogin = async (username: string, password:string) => {
  try {
    // const data = {
    //   login: username,
    //   password: password,
    //   client_id: clientId,
    //   client_secret: clientSecret,
    //   scope: scope
    // }
    const data = new URLSearchParams();
        data.append("client_id", clientId);
        data.append("client_secret", clientSecret);
        data.append("scope", scope);
        data.append("username", username);
        data.append("password", password);
        data.append("grant_type", grantType);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    console.log(data);
    const response = await api.post('/connect/token', data, config);
    
    //localStorage.setItem('access_token', response.data.access_token);
    return response;
  } catch (error) {

      throw error;
  }
}