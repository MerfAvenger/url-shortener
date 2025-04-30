import { createAccount, login } from "./actions";
import "./Login.css";

export type LoginProps = {
  setUserEmail: (email: string | null) => void;
  setUserId: (id: number | null) => void;
  setUserUrls: (urls: string) => void;
};

export default function Login(props: LoginProps) {
  const { setUserEmail, setUserId, setUserUrls } = props;

  return (
    <div className="login container">
      <form
        className="login__form"
        onSubmit={(event) => {
          login(event, setUserEmail, setUserId, setUserUrls).catch((error) => {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
          });
        }}
      >
        <div className="login__actions">
          <p>
            Log into or create an account to create or view your shortened URLs
          </p>
          <div className="login__actions__buttons">
            <button
              onClick={(event) => {
                login(event, setUserEmail, setUserId, setUserUrls).catch(
                  (error) => {
                    console.error("Login error:", error);
                    alert("Login failed. Please try again.");
                  },
                );
              }}
            >
              Log in
            </button>
            <button
              onClick={(event) => {
                createAccount(event, setUserEmail, setUserId).catch((error) => {
                  console.error("Create account error:", error);
                  alert(
                    "Account creation failed. Please try again or use a different email address.",
                  );
                });
              }}
            >
              Create account
            </button>
          </div>
        </div>
        <fieldset className="login__fieldset">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            minLength={8}
            maxLength={128}
          />
        </fieldset>
      </form>
    </div>
  );
}
