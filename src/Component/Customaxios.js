import axios from 'axios';

const customaxios = axios.create({
  baseURL: 'https://lms-backend-sokx.onrender.com', // Your backend base URL
  withCredentials: true, // Ensure credentials (like cookies) are included in requests
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

// Response Interceptor
customaxios.interceptors.response.use(
  (response) => {
    // Log the response data
    console.log('Response Data:', response.data);

    // Log the response headers to check for cookies or other headers
    console.log('Response Headers:', response.headers);

    // If you want to check for a specific header like 'Set-Cookie'
    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      console.log('Set-Cookie Header:', setCookieHeader);
    } else {
      console.log('No Set-Cookie Header in Response');
    }

    // Return the response so that the original request can continue
    return response;
  },
  (error) => {
    // Handle errors here if needed
    console.error('Error in response:', error.response);
    return Promise.reject(error);
  }
);

export default customaxios;
