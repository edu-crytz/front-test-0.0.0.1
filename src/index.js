import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from "aws-amplify";
import App from './App.jsx';
// import { Router } from './Router.jsx';

//import './styles/global.css'

Amplify.configure({
  Auth: {
    mandatorySigIn: true,
    region: "us-east-1",
    userPoolId: "us-east-1_eogOyGsbw",
    identityPoolId: "us-east-1:bf8f41b7-d721-4231-9a5f-c25b81d3e8d6",
    userPoolWebClientId: "607oeuh39mnhcl0eq7q2t1l69v"
  },
  API: {
    endpoints: [
      {
        name: "test",
        endpoint: "https://3n2g9riptl.execute-api.us-east-1.amazonaws.com",
        region: "us-east-1"
      }
    ]
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);