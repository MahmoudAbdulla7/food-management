import React from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import { useState, useEffect, useContext } from "react";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import { AuthContext } from "../../../Context/authContext";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import axios, { toast, getList } from "../../../utls/index";
import Pagination from "../../../SharedModule/Components/Pagination/Pagination";

export default function Favorits() {
  const [favList, setFavList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState([]);
  let { url, Authorization } = useContext(AuthContext);
  const [searchValue, setsearchValue] = useState();

  function getFavorites() {
    getList({
      path: "userRecipe",
      setIsLoading,
      setNumberOfPages,
      setList: setFavList,
    });
  }

  useEffect(() => {
    getFavorites();
  }, []);

  function deleteFromFav(id) {
    axios
      .delete(`${url}userRecipe/${id}`, {
        headers: { Authorization: Authorization },
      })
      .then((res) => {
        toast.success("successfuly");
        getFavorites();
      })
      .catch((err) => {
        toast.error(err.data.message || "Failed");
        console.log(err);
      });
  }

  return (
    <>
      <Header />

      {isLoading ? (
        <div className="favLoading d-flex align-items-center justify-content-center text-success fs-1">
          <Loading />
        </div>
      ) : (
        <div className="row">
          {favList.length > 0 ? (
            favList
              .filter((item) => item.recipe.imagePath !== "")
              .map((item, idx) => (
                <div key={idx} className="col-md-4 my-3">
                  <div className="p-3 card ">
                    <div className="image">
                      <img
                        className=" handelFavImage w-100"
                        src={`https://upskilling-egypt.com/${item.recipe.imagePath}`}
                        alt="recipe image"
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <div className="name">
                          <h6 className="mt-3 mb-0">Recipe name :</h6>
                          <p className="text-muted m-0">{item.recipe.name}</p>
                        </div>
                        <div className="description">
                          <h6 className="mt-3 mb-0">Recipe description :</h6>
                          <p className="text-muted m-0">
                            {item.recipe.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-end">
                        <button
                          onClick={() => deleteFromFav(item.recipe.id)}
                          className="btn btn-outline-success px-4"
                        >
                          <i className="fs-4 fa-solid fa-heart-circle-minus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <NoData />
          )}
        </div>
      )}

      {/* Pagination */}
    </>
  );
}
