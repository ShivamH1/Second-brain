import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";

interface SharedContentItem {
  type: "twitter" | "youtube";
  link: string;
  title: string;
}

export function SharedBrain() {
  const { hash } = useParams<{ hash: string }>();
  console.log("hash", hash);

  const [sharedContent, setSharedContent] = useState<SharedContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/brain/${hash}`
        );
        setSharedContent(response?.data?.content);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching shared content:", err);
        setError("Failed to load shared content. Please try again later.");
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [hash]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Shared Content</h1>
      <div className="flex gap-4 flex-wrap">
        {sharedContent?.map(({type, link, title}) => <Card 
            type={type}
            link={link}
            title={title}
        />)}
      </div>
    </div>
  );
}
