import "./CreateUrl.css";

import { createUrl } from "./actions";

export type CreateUrlProps = {
  userId: number;
};

export default function CreateUrl(props: CreateUrlProps) {
  const { userId } = props;
  return (
    <div className="create__url container">
      <h3>Create a URL</h3>
      <form className="create__url__form">
        <fieldset className="create__url__fieldset">
          <label htmlFor="long">URL</label>
          <input name="long" type="url" placeholder="Enter a URL to shorten" />
          <input name="id" type="number" value={userId} hidden />
          <button className="create__url__button" onClick={createUrl}>
            Create URL
          </button>
        </fieldset>
      </form>
    </div>
  );
}
