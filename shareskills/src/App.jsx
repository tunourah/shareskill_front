import "./App.css";
import { useState  , useEffect} from "react";
 

import Router from "./Router";
import { getUser } from "./utilities/users-api";


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const resolveUser = async () => {
    const userObj = await getUser();
    setUser(userObj);
    setLoading(false); 
  };

  useEffect(() => {
    resolveUser();
  }, []);
  
  useEffect(() => {
    // console.log("🔁 App.jsx: user updated =", user); 
  }, [user]);
  if (loading) return null; // or a spinner

  return <Router user={user} setUser={setUser} />;
}


export default App;
 