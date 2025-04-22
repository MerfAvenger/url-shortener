import { useState } from "react";
import "./App.css";

import Home from "./containers/home/Home";

function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <>
      <Home
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        userId={userId}
        setUserId={setUserId}
      />
    </>
  );
}

export default App;
