import "./Home.css";

import Login from "../login/Login";
import CreateUrl from "../create-url/CreateUrl";

export type HomeProps = {
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  userId: number | null;
  setUserId: (id: number | null) => void;
};

export default function Home(props: HomeProps) {
  const { userEmail, setUserEmail, userId, setUserId } = props;

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
