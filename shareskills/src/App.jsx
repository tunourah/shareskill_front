import "./App.css";
import { useState } from "react";

import Router from "./Router";
 

function App() {
  const [user, setUser] = useState(null)
  return (
     <Router user={user} setUser={setUser} />
  );
}

export default App;
 