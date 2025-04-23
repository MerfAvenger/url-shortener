import "./App.css";

import { useState } from "react";

import Login from "./containers/login/Login";
import CreateUrl from "./containers/create-url/CreateUrl";
import MyUrls from "./containers/my-urls/MyUrls";

function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [urlString, setUrlString] = useState<string>(JSON.stringify([]));

  return (
    <div className="home container">
      <div className="highlight" />
      <h1>Shorten your URLs</h1>
      {!userEmail || !userId ? (
        <Login
          setUserEmail={setUserEmail}
          setUserId={setUserId}
          setUserUrls={setUrlString}
        />
      ) : (
        <>
          <CreateUrl userId={userId} />
          <MyUrls urlString={urlString} />
        </>
      )}
    </div>
  );
}

export default App;
