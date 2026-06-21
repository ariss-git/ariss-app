import { Link } from "react-router-dom";

const FetchAllProduct = () => {
  return (
    <div>
      <Link to={"/categories"}>Categories</Link>
      <Link to={"/subcategories"}>Subcategories</Link>
    </div>
  );
};

export default FetchAllProduct;
