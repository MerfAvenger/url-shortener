import { useMemo } from "react";
import { parseUrlString } from "./actions";
import { URL } from "../../model";
import URLCard from "./components/url/URLCard";

type MyUrlsProps = {
  urlString: string;
};

function renderUrls(urls: URL[]) {
  return urls
    .sort((a, b) => b.visits - a.visits)
    .map((url) => <URLCard key={url.slug} url={url} />);
}

export default function MyUrls(props: MyUrlsProps) {
  const { urlString } = props;

  const urls = useMemo(() => {
    try {
      return parseUrlString(urlString);
    } catch (error) {
      console.error("Error parsing URL string:", error);
      return [];
    }
  }, [urlString]);

  return (
    <div className="my__urls__container">
      <h2 className="my__urls__title">My URLs</h2>
      {renderUrls(urls)}
    </div>
  );
}
