import "./App.css";

import { useState } from "react";

import Login from "./containers/login/Login";
import CreateUrl from "./containers/create-url/CreateUrl";

function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <div className="home container">
      <div className="highlight" />
      <h1>Shorten your URLs</h1>
      {!userEmail || !userId ? (
        <Login setUserEmail={setUserEmail} setUserId={setUserId} />
      ) : (
        <CreateUrl userId={userId} />
      )}
    </div>
  );
}

export default App;
