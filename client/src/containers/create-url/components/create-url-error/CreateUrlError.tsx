import "./CreateUrlError.css";

type CreateUrlErrorProps = {
  error: string | null;
};

export default function CreateUrlError(props: CreateUrlErrorProps) {
  const { error } = props;

  return (
    <div className="create__url__error">
      <p className="create__url__error__message">{error}</p>
    </div>
  );
}
