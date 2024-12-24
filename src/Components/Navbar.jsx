import "../App.css";
import PropTypes from "prop-types";

const Navbar = ({ category, setCategory }) => {
  const categories = [
    { name: "general", icon: "bi-globe" },
    { name: "technology", icon: "bi-laptop" },
    { name: "business", icon: "bi-briefcase" },
    { name: "health", icon: "bi-heart-pulse" },
    { name: "sports", icon: "bi-trophy" },
    { name: "entertainment", icon: "bi-film" },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <span className="badge bg-light text-dark fs-4">News</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className={`nav-item point ${category === cat.name ? "active-category" : ""}`}
              >
                <div
                  className="nav-link d-flex align-items-center gap-2"
                  onClick={() => setCategory(cat.name)}
                  role="button"
                  aria-label={`Select ${cat.name} category`}
                >
                  <i className={`${cat.icon}`}></i>
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default Navbar;


