import { useLocation } from "react-router-dom";

function useQuery(param) {
  const query = new URLSearchParams(useLocation().search);
  return query.get(param);
}

export default useQuery;
