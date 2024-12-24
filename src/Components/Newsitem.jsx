
import PropTypes from "prop-types";

const Newsitem = ({ title, description, src, url }) => {
  const truncateText = (text, maxLength) => {
    return text ? text.slice(0, maxLength) : "";
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/325x200?text=No+Image+Available"; // Replace with a suitable fallback image URL
  };

  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2 overflow-hidden"
      style={{ maxWidth: "345px" }}
    >
      <img
        src={src}
        onError={handleImageError}
        style={{ height: "200px", width: "325px", overflow: "hidden" }}
        className="card-img-top"
        alt="News thumbnail"
      />
      <div className="card-body overflow-hidden">
        <h5 className="card-title">
          {truncateText(title, 40) || "Breaking news"}
        </h5>
        <p className="card-text overflow-hidden">
          {truncateText(description, 90) || "Updates: What is going on today, Check out here."}
        </p>
        <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};

Newsitem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  src: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

Newsitem.defaultProps = {
  description: "No description available.",
};

export default Newsitem;
