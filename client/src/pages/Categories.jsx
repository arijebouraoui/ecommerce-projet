import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import "../styles/Categories.css";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container categories-page">
        <h1 className="text-center mb-5">All Categories</h1>
        <div className="categories-grid">
          {categories.map((c) => (
            <Link 
              to={`/category/${c.slug}`} 
              key={c._id}
              className="category-card"
            >
              <div className="category-content">
                <h3>{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;