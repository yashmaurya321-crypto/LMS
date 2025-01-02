import axios from 'axios';

const customaxios = axios.create({
  baseURL: 'https://lms-backend-z2zb.onrender.com',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor (Already Added)
customaxios.interceptors.request.use((request) => {
  console.log('Request Headers:', request.headers);
  console.log('Request with Credentials:', request.withCredentials);
  return request;
});

customaxios.interceptors.response.use(
  (response) => {
   
    console.log('Response Data:', response.data);

    
    console.log('Response Headers:', response.headers);

    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      console.log('Set-Cookie Header:', setCookieHeader);
    } else {
      console.log('No Set-Cookie Header in Response');
    }

    return response;
  },
  (error) => {
    // Handle errors here if needed
    console.error('Error in response:', error.response);
    return Promise.reject(error);
  }
);

export default customaxios;
