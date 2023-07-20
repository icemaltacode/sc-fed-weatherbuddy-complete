import { useContext } from "react";
import SearchContext from "./context";

function useSearch() {
  return useContext(SearchContext);
}

export default useSearch;