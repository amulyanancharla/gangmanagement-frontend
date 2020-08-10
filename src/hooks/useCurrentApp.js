import { useLocation } from "react-router-dom";

function useCurrentApp() {
  const params = useLocation();
  const arr = params.pathname.split("/");
  if (arr.length > 0) return arr[1];

  return null;
}

export default useCurrentApp;
