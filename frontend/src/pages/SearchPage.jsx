import SearchBar from "../components/SearchBars";
import SearchButton from "../components/SearchButton";
import styles from "../pages/SearchPage.module.css";

function SearchPage() {
  return (
    <>
      <div className={styles.container}>
        <h1>Search by company name or by phone number</h1>
        <SearchBar />
        <SearchButton />
      </div>
    </>
  );
}

export default SearchPage;
