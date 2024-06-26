import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/SearchContext.js";
import { Link } from "react-router-dom";
import SeeMore from "../components/Buttons/SeeMore";
import AddToCart from "../components/Buttons/AddToCart";
import { useAuth } from "../context/AuthContext";

function SearchPage() {
  const [searchProduct,setSearchProduct] = useSearch([]);
  const [auth,setAuth] = useAuth()
  return (
    <Layout>
      <div className="col">
        <div className="container pt-2">
          <h4 className="text-white">All Products</h4>
          {searchProduct.length <= 0 ? (
            <h2 className="text-danger">No Product Found</h2>
          ) : (
            <div className="row d-flex justify-content-around">
              {searchProduct.map((p) => (
                <Link
                  to={auth?.user?.role===1 ? (`/dashboard/admin/product/${p._id}`) : (`/product-detail/${p._id}/${p.category}`)}
                  className="card bg-purple-800 text-white p-1 col-lg-4 col-md-6 col-sm-12 m-2 text-decoration-none"
                  style={{ width: "17rem", height: "26rem" }}
                  key={p._id}
                >
                  <img
                    className="card-img-top"
                    src={`${window.location.origin}/api/v1/product/product-photo/${p._id}`}
                    alt="Card_image_cap"
                  />
                  <div className="card-body p-1">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text fw-light">
                      {p.description.substring(0, 25)}...
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-purple-900 text-white p-1 fw-bold">
                    &#8377;{`${p.price} | Stock ${p.quantity} items`}
                    </li>
                    <div className="d-flex mt-2 mb-2">
                      <div className="me-3">
                        <SeeMore pId={p._id} cId={p.category} />
                      </div>
                      <div>
                        <AddToCart product={p} width={2} height={1} />
                      </div>
                    </div>
                  </ul>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
