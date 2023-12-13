import React, { useContext, useEffect, useState } from "react";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import Pagination from "../../../SharedModule/Components/Pagination/Pagination";
import noData from "../../../assets/no data.svg";
import { customFetch, getList, toast } from "../../../utls/index";
import ViewModal from "../../../SharedModule/Components/DeleteModal/ViewModal";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [tagId, setTagId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalState, setModalState] = useState("close");
  const handleClose = () => {
    setItemId(null)
    setModalState("close")};

  //---

  function getRecipesList({ pageNumber = 1, name, categoryId, tagId } = []) {
    getList({
      path: "Recipe",
      setList: setRecipesList,
      setIsLoading: setIsLoading,
      setNumberOfPages: setNumberOfPages,
      pageNumber: pageNumber,
      name,
      categoryId,
      tagId,
    });
  }
  function getTags() {
    customFetch({
      path: "tag/",
      pageSize: 100,
      pageNumber: "1",
      method: "get",
      logedIn: true,
    })
      .then((result) => {
        setTags(result.data);
      })
      .catch((errors) => {
        toast(errors?.data?.message || "Network Error");
      });
  }
  function getCategoryList() {
    setFlag(true);

    customFetch({
      path: "Category/",
      pageSize: 100,
      pageNumber: "1",
      method: "get",
      logedIn: true,
    })
      .then((result) => {
        setFlag(false);
        setCategories(result.data.data);
      })
      .catch((errors) => {
        setFlag(false);
        toast(errors?.data?.message || "Network Error");
      });
  }
  useEffect(() => {
    getRecipesList();
    getCategoryList();
    getTags();
  }, []);
  //--- View

  function showViewModal(recipe) {
    setModalState("View");
    setItemId(recipe.id)
  }

  //--- filltration

  function fillterByTag(e) {
    setTagId(e.target.value);
    getRecipesList({ name: searchValue, categoryId, tagId: e.target.value });
  }
  function fillterByCategory(e) {
    setCategoryId(e.target.value);
    getRecipesList({ name: searchValue, categoryId: e.target.value, tagId });
  }
  let searchByName = (e) => {
    setSearchValue(e.target.value);
    return getRecipesList({ name: e.target.value, tagId, categoryId });
  };

  return (
    <>
      <div className="handel-table-responsive">
        <div>
          <div className="row my-2">
            <div className="col-md-6 my-2">
              <div className="nameValue pe-2">
                <input
                  onChange={searchByName}
                  className="form-control "
                  placeholder="Name of recipe"
                  type="text"
                />
              </div>
            </div>
            <div className="col-md-3 my-2">
              <div className="Tag px-2">
                <select
                  onChange={fillterByTag}
                  className="form-select"
                  itemType="Number"
                  aria-label="Default select example"
                >
                  <option value="">Select Tag</option>
                  {tags.map((tag, idx) => {
                    return (
                      <option key={idx} value={tag.id}>
                        {tag.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-3 my-2">
              <div className="Categories px-2">
                <select
                  onChange={fillterByCategory}
                  className="form-select"
                  aria-label="Default select example"
                  itemType="number"
                >
                  <option value="">Select Categoty</option>
                  {categories.map((category, idx) => {
                    return (
                      <option key={idx} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="">
            {isLoading ? (
              <div className="loading-table fs-1 text-black-50 d-flex justify-content-center align-items-center">
                <Loading />
              </div>
            ) : recipesList.length > 0 ? (
              <div className="table-responsive">
                <table className="table text-center">
                  <thead className="rounded-4">
                    <tr>
                      <th className="py-3 bg-body-secondary" scope="col">
                        Name
                      </th>
                      <th className="py-3 bg-body-secondary" scope="col">
                        Image
                      </th>
                      <th className="py-3 bg-body-secondary" scope="col">
                        Price
                      </th>
                      <th className="py-3 bg-body-secondary" scope="col">
                        Description
                      </th>
                      <th className="py-3 bg-body-secondary" scope="col">
                        tag
                      </th>
                      <th className="py-3 bg-body-secondary" scope="col">
                        Category
                      </th>
                      <th className="py-3 bg-body-secondary" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {recipesList?.filter(recipe =>recipe.imagePath!=="") .map((recipe, idx) => (
                    <tbody key={idx}>
                      <tr>
                        <th scope="row">{recipe.name}</th>
                        <td className="w-25 text-center">
                          <img
                            className="w-25"
                            src={
                              recipe.imagePath
                                ? `https://upskilling-egypt.com:443/${recipe.imagePath}`
                                : noData
                            }
                            alt=""
                          />
                        </td>
                        <td>{recipe.price}</td>
                        <td>{recipe.description}</td>
                        <td>{recipe.tag.name}</td>
                        <td>{recipe.category[0]?.name}</td>
                        <td>

                          <i onClick={() => {
                                  showViewModal(recipe);
                                }} className="btn fa-solid text-success fa-eye"></i>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            ) : (
              <NoData />
            )}
          </div>
        </div>

        <Pagination
          getList={getRecipesList}
          searchValue={searchValue}
          numberOfPages={numberOfPages}
        />

        <ViewModal
          itemId={itemId}
          modelState={modalState}
          handleClose={handleClose}
        />
      </div>
    </>
  );
}
