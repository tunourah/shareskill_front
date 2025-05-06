import "./App.css";
import { useState  , useEffect} from "react";
 

import Router from "./Router";
import { getUser } from "./utilities/users-api";


function App() {
  const [user, setUser] = useState(getUser());

  return (
     <Router user={user} setUser={setUser} />
  );
}

export default App;
 