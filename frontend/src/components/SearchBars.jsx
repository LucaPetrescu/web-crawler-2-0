import { useState, useEffect } from "react";
import axios from "axios";
import ErrorBoundary from "../error-handling/ErrorBoundary";
import { queryElasticSearch } from "../utils/APIRoutes";
import SelectedSuggestion from "./SelectedSuggestion";
import styles from "./SearchBar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [website, setWebsite] = useState(null);
  const [queryData, setQueryData] = useState(null);

  useEffect(() => {
    fetchSuggestions();
  }, [inputValue]);

  const fetchSuggestions = async () => {
    try {
      if (!inputValue) {
        setSuggestions([]); // Clear suggestions when inputValue is empty
        return;
      }
      const response = await axios.post(queryElasticSearch, { inputValue });
      const responseData = response.data.map((item) => item._source?.domain);
      setQueryData(response.data);
      setSuggestions(responseData);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = async (event) => {
    const input = event.target.value;
    setInputValue(input);
    console.log(inputValue);
  };

  const handleResultClick = (name) => {
    setSelectedSuggestion(name);
    setSuggestions([]);

    const selectedWebsite = queryData.find(
      (item) => item._source?.domain === name
    );
    setWebsite(selectedWebsite ? selectedWebsite._source : null);
    console.log(website);
  };

  const handleSelectedSuggestionClose = () => {
    setSelectedSuggestion(null);
  };

  return (
    <ErrorBoundary>
      <div className="d-flex justify-content-center mt-3">
        <div className={styles.searchBar}>
          <input
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Search here"
            className="form-control"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {suggestions.length > 0 && (
          <div>
            <ul className={`list-group mt-2 ${styles["scrollable-list"]}`}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={`list-group-item } `}
                  onClick={() => handleResultClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {selectedSuggestion && (
        <SelectedSuggestion
          name={selectedSuggestion}
          details={website}
          onClose={handleSelectedSuggestionClose}
        />
      )}
    </ErrorBoundary>
  );
}

export default SearchBar;
