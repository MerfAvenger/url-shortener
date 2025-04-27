import "./URLCard.css";

import { URL } from "../../../../model";

type URLCardProps = {
  url: URL;
};

export default function URLCard(props: URLCardProps) {
  const { slug, long, visits } = props.url;

  const url = window.origin + "/" + slug;

  return (
    <div className="url__card">
      <a href={url}>{url}</a>
      <div className="url__card__details">
        <p>{long}</p>
        <p>
          <b>{visits}</b> Visits
        </p>
      </div>
    </div>
  );
}
