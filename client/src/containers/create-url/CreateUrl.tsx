import { createUrl } from "./actions";
import "./CreateUrl.css";

export type CreateUrlProps = {};

export default function CreateUrl(_props: CreateUrlProps) {
  return (
    <div>
      <h1>Create URL</h1>
      <form>
        <input type="text" placeholder="Long URL" />
        <button onClick={createUrl}>Create</button>
      </form>
    </div>
  );
}
