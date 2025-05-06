import "./App.css";
import { useState  , useEffect} from "react";
 

import Router from "./Router";
import { getUser } from "./utilities/users-api";


function App() {
  const [user, setUser] = useState(null);
  const loggingIn = false

  const resolveUser = async () =>{
    const userObj = await getUser()
    setUser(userObj)
  }

  useEffect(() => {
    resolveUser()
  }, [])
  

  return (
     <Router user={user} setUser={setUser} loggingIn={loggingIn} />
  );
}

export default App;
 