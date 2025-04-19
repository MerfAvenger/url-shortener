import { createAccount, login } from "./actions";
import "./Login.css";

export type LoginProps = {};

export default function Login(props: LoginProps) {
  return (
    <div className="login container">
      <form className="login__form" onSubmit={login}>
        <div className="login__actions">
          <p>
            Log into or create an account to create or view your shortened URLs
          </p>
          <div className="login__actions__buttons">
            <input type="submit" value="Log in" onSubmit={login} />
            <input
              type="submit"
              value="Create account"
              onSubmit={createAccount}
            />
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
            minLength={12}
            maxLength={128}
          />
        </fieldset>
      </form>
    </div>
  );
}
