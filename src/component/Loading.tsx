import ClipLoader from "react-spinners/ClipLoader";
import "../css/loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <ClipLoader />
    </div>
  );
}
