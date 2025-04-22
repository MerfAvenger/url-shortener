import { copyUrl } from "./actions";
import "./CreateUrlSuccess.css";
import copyImage from "/assets/copy.svg";

type CreateUrlSuccessProps = {
  createdUrl: string;
};

export default function CreateUrlSuccess(props: CreateUrlSuccessProps) {
  const { createdUrl } = props;

  return (
    <>
      <p className="create__url__result__message">
        Created URL successfully! Follow the link below to use your new URL:
      </p>
      <div className="create__url__link__container">
        <a className="create__url__result__link" href={createdUrl}>
          {createdUrl}
        </a>
        <button
          className="create__url__copy__button"
          onClick={() => copyUrl(createdUrl)}
        >
          <img
            className="create__url__copy__image"
            src={copyImage}
            alt="Copy"
          />
        </button>
      </div>
    </>
  );
}
