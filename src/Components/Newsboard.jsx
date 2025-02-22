import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Newsitem from "./Newsitem";
import "../App.css";       
const Newsboard = ({ category }) => {
  const apikey = import.meta.env.VITE_NEWS_API_KEY
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        let url;
        const today = new Date().toISOString().split("T")[0];

        if (selectedDate) {
          const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
          url = `https://newsapi.org/v2/everything?q=${category}&from=${formattedDate}&to=${formattedDate}&sortBy=publishedAt&apiKey=${apikey}`;

          if (formattedDate === today) {
            url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apikey}`;
          }
        } else {
          url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apikey}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Unable to fetch news`);
        }

        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          throw new Error("No articles found");
        }
      } catch (err) {
        setError(err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <h2 className="text-center head">
        Latest <span className="badge heading">News</span>
      </h2>
      <div className="text-center my-3">
        <label htmlFor="date" className="me-2">
          Filter by Date:
        </label>
        <input
          type="date"
          id="date"
          className="form-control d-inline-block"
          style={{ width: "200px" }}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div aria-live="polite" aria-atomic="true" className="text-center">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : error ? (
          <div className="text-center text-danger my-5">
            <h4>Failed to load news</h4>
            <p>{error}</p>
          </div>
        ) : articles.length > 0 ? (
          articles.map((news, index) =>
            news.urlToImage && (
              <Newsitem
                key={index}
                title={news.title}
                description={news.description}
                src={news.urlToImage}
                url={news.url}
              />
            )
          )
        ) : (
          <div className="text-center text-muted my-5">
            <h4>No news found for the selected date.</h4>
            <p>Try selecting a different date or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

Newsboard.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Newsboard;