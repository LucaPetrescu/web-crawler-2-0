import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./SelectedSuggestion.module.css";

function SelectedSuggestion({ name, onClose, details }) {
  return (
    <div className={styles.centeredContainer}>
      <div className={styles.selectedSuggestionContainer}>
        <h3>{details.company_commercial_name}</h3>
        <h2>
          Website: <a href={`http://${name}`}>{name}</a>
        </h2>
        <button onClick={onClose} className="btn btn-danger">
          Close
        </button>
      </div>
    </div>
  );
}

export default SelectedSuggestion;
