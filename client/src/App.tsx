import "./App.css";

import { useCallback, useMemo, useState } from "react";

import Login from "./containers/login/Login";
import CreateUrl from "./containers/create-url/CreateUrl";
import MyUrls from "./containers/my-urls/MyUrls";
import { parseUrlString } from "./containers/my-urls/actions";

function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [urlString, setUrlString] = useState<string>(JSON.stringify([]));

  const hasUrls = useMemo(
    () => parseUrlString(urlString).length > 0,
    [urlString],
  );

  const updateUrls = useCallback(
    (newUrlString: string) => {
      const urls = parseUrlString(urlString);
      const newUrl = parseUrlString(newUrlString);
      const updatedUrls = [...urls, ...newUrl];
      setUrlString(JSON.stringify(updatedUrls));
    },
    [urlString],
  );

  return (
    <>
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
            <CreateUrl userId={userId} updateUrls={updateUrls} />
          </>
        )}
      </div>
      {hasUrls ? <MyUrls urlString={urlString} /> : null}
    </>
  );
}

export default App;
