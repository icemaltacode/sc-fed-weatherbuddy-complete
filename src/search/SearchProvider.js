import SearchContext from "./context";

function SearchProvider({ locationHandler, children }) {
  const value = {
    app_id: process.env.REACT_APP_OPENWEATHER_APP_ID,
    locationHandler: locationHandler,
  };
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export default SearchProvider;
