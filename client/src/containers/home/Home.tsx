import "./Home.css";

import Login from "../login/Login";

export default function Home() {
  return (
    <div className="home container">
      <div className="highlight" />
      <h1>Shorten your URLs</h1>
      <Login />
    </div>
  );
}
