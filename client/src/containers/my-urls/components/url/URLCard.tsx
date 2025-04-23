import "./URLCard.css";

import { URL } from "../../../../model";

type URLCardProps = {
  url: URL;
};

export default function URLCard(props: URLCardProps) {
  const { slug, long, visits } = props.url;

  const url = window.origin + "/" + slug;

  return (
    <div className="url__container">
      <a href={url}>{url}</a>
      <p>Long URL: {long}</p>
      <p>Visits: {visits}</p>
    </div>
  );
}
