import { FiCopy, FiExternalLink } from "react-icons/fi";

interface ShareLinkProps {
  url: string;
}

const copyToClipboard = (url: string) => {
  if (url) {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  }
};

const ShareLink = ({ url }: ShareLinkProps) => (
  <div className="mt-4 p-4 bg-gray-100">
    <div className="flex items-center">
      <h3 className="text-lg font-semibold">Share Link</h3>
      <span className="text-gray-500 text-sm ml-2">(Public draw)</span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 text-custom-gray-3 hover:text-gray-600"
      >
        <FiExternalLink size={16} />
      </a>
    </div>

    <div className="mt-2 flex items-center">
      <input
        type="text"
        value={url}
        readOnly
        className="w-md h-8 border border-custom-gray-2 border-r-0 px-3 py-1 bg-white text-gray-700"
      />
      <button
        onClick={() => copyToClipboard(url)}
        className="h-8 border border-custom-gray-2 bg-gray-300 hover:bg-gray-400 px-3 py-1 text-sm hover:cursor-pointer"
      >
        <FiCopy size={16} />
      </button>
    </div>
  </div>
);

export default ShareLink;

// <div className="bg-gray-800 text-white p-4 mt-6">
// <h2 className="text-lg font-semibold">Friday Futsal</h2>
// <p className="text-sm">10 participants in 2 teams</p>
// </div>
