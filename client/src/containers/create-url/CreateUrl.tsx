import { useState } from "react";
import "./CreateUrl.css";

import { createUrl } from "./actions";
import CreateUrlError from "./components/create-url-error/CreateUrlError";
import CreateUrlSuccess from "./components/create-url-success/CreateUrlSuccess";

export type CreateUrlProps = {
  userId: number;
};

export default function CreateUrl(props: CreateUrlProps) {
  const { userId } = props;
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="create__url container">
      <form className="create__url__form">
        <fieldset className="create__url__fieldset">
          <input name="id" type="number" value={userId} hidden readOnly />
          <div className="create__url__enter__url__container">
            <input
              name="long"
              type="url"
              placeholder="Enter a URL to shorten"
            />
            <button
              className="create__url__button"
              onClick={(event) => createUrl(event, setCreatedUrl, setError)}
            >
              Shorten URL
            </button>
          </div>
        </fieldset>
      </form>
      <div className="create__url__result">
        {createdUrl && <CreateUrlSuccess createdUrl={createdUrl} />}
        {error && <CreateUrlError error={error} />}
      </div>
    </div>
  );
}
