import React from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import noData from "../../../assets/no data.svg";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  function getRecipesList() {
    axios
      .get(
        `https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=5&pageNumber=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminTkn")}`,
          },
        }
      )
      .then((result) => {
        setRecipesList(result.data.data);
      })
      .catch((errors) => {
        toast("Network Error");
      });
  }
  useEffect(() => {
    getRecipesList();
  }, []);

  // handel modal
  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();
  const [show, setShow] = useState(false);
  const [itemId, setitemId] = useState();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalState, setModalState] = useState("close");
  const handleClose = () => setModalState("close");
  const handleShow = () => setShow(true);
  function getTags() {
    axios
      .get(`https://upskilling-egypt.com:443/api/v1/tag/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminTkn")}`,
        },
      })
      .then((result) => {
        setTags(result.data);
      })
      .catch((errors) => {
        toast("Network Error");
      });
  }
  function getCategoryList() {
    axios
      .get(`https://upskilling-egypt.com:443/api/v1/Category/?pageSize=100&pageNumber=1`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminTkn")}`,
        },
      })
      .then((result) => {
        setCategories(result.data.data);
      })
      .catch((errors) => {
        toast("Network Error");
      });
  }

//---Update
  function showUpdateModal(recipe) {
    setModalState("update");
  }
  //--- Add
  function showAddModal(recipe) {
    setModalState("Add");
    getCategoryList();
    getTags();
    reset()
  }
  function addNewRecipe(data) {
    const formData = new FormData();
    const ob= Object.entries(data).forEach(([key, value]) => {
      if (key ==! "recipeImage") {
        return formData.append(key, value);
      }else if(key=="price"||key=="tagId"||key=="categoriesIds"){
        return formData.append(key, Number(value));
      }
      return formData.append(key, value[0]);
    });

    axios.post(`https://upskilling-egypt.com:443/api/v1/Recipe/`,formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminTkn")}`,
        'Content-Type': 'multipart/form-data'
      },
    })
    .then((result) => {
      handleClose();
      getRecipesList();
      toast(result.data.message||"Created Successfully");
    })
    .catch((error) => {
      toast("Faild");
      handleClose();
    });
    
  }
  //--- Delete
  function showDeleteModal(recipe) {
    setModalState("Delete");
    setitemId(recipe.id);
  }
  function deleteRecipe() {
    axios
      .delete(`https://upskilling-egypt.com:443/api/v1/Recipe/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminTkn")}`,
        },
      })
      .then((result) => {
        handleClose();
        getRecipesList();
        toast("Delete Successfully");
      })
      .catch((error) => {
        toast("Faild");
        handleClose();
      });
  }

  return (
    <>
      <Header />
      <div>
        <div className="d-flex justify-content-center py-4">
          <div className="col-md-6">
            <div>
              <h4>Recipe Table Details</h4>
              <span>You can check all details</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-end">
              <button onClick={showAddModal} className="btn btn-success me-1">
                Add New Recipe
              </button>
            </div>
          </div>
        </div>
        <table className="table text-center">
          <thead>
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
          {recipesList?.map((recipe) => (
            <tbody key={recipe.id}>
              <tr>
                <th scope="row">{recipe.name}</th>
                <td className="w-25 text-center">
                  <img
                    className="w-25"
                    src={`https://upskilling-egypt.com:443/${recipe.imagePath}`}
                    alt=""
                  />
                </td>
                <td>{recipe.price}</td>
                <td>{recipe.description}</td>
                <td>{recipe.tag.name}</td>
                <td>{recipe.category[0]?.name}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn  text-success"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <p
                          onClick={() => {
                            showUpdateModal(recipe);
                          }}
                          className="px-2 py-1 btn"
                        >
                          <i className="fa-regular fa-pen-to-square text-success"></i>{" "}
                          Update
                        </p>
                      </li>
                      <li>
                        <p
                          onClick={() => {
                            showDeleteModal(recipe);
                          }}
                          className="px-2 py-1 btn"
                        >
                          <i className="fa-regular fa-trash-can text-success"></i>{" "}
                          Delete
                        </p>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <Modal className="p-5" show={modalState == "Delete"} onHide={handleClose}>
        <form onSubmit={handleSubmit(deleteRecipe)} className="p-4 text-center">
          <img src={noData} alt="#" />
          <h5 className="mb-5">Delete This Category ?</h5>
          <span className="text-muted">
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </span>
          <hr />
          <div className="text-end">
            <button className="btn btn-danger px-4">Delete this item</button>
          </div>
        </form>
      </Modal>
      <Modal className="p-5" show={modalState == "Add"} onHide={handleClose}>
        <h2 className="px-4 pt-5">Add new recipe</h2>
        <form onSubmit={handleSubmit(addNewRecipe)} className="pb-5 px-4 ">
          <div className="Recipe-Name">
            <input
              className="form-control"
              placeholder="Recipe Name"
              type="text"
              defaultValue=""
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-danger ms-2">{errors.name.message}</span>
            )}
          </div>
          <div className="Price my-2">
            <div className="input-group">
              <input
              defaultValue={0}
                type="number"
                className="form-control"
                placeholder="Price"
                {...register("price", { required: "Price is required",setValueAs:Number })}
              />
              <span className="input-group-text" id="basic-addon2">
                EGP
              </span>
            </div>
            {errors.price && (
              <span className="text-danger ms-2 ">{errors.price.message}</span>
            )}
          </div>
          <div className="Tag my-2">
            <select className="form-select" itemType="Number" aria-label="Default select example" {...register("tagId",{required:'Please select a tag',setValueAs:Number})}>
              {tags.map((tag,idx)=>{
                return <option key={idx} value={tag.id}>{tag.name}</option>
              })}
            </select>
            {errors.tagId && <span className="text-danger ms-2">{errors.tagId.message}</span>}
          </div>
          <div className="Categories my-2">
            <select className="form-select" aria-label="Default select example" itemType="number" {...register("categoriesIds",{required:'Please select a tag',setValueAs:Number})}>
              {categories.map((category,idx)=>{
                return <option key={idx} value={category.id}>{category.name}</option>
              })}
            </select>
            {errors.categoriesIds && <span className="text-danger ms-2">{errors.categoriesIds.message}</span>}
          </div>
          <div className="Recipe-Description my-2">
            <textarea
              className="form-control my-2"
              placeholder="description"
              type="text"
              {...register("description",{required:"Description is required"})}
            />
            {errors.description && <span className="text-danger ms-2">{errors.description.message}</span>}
          </div>
          <div className="Recipe-Image">
            <input
              className="form-control"
              placeholder="Recipe Name"
              type="file"
              {...register("recipeImage", { required: "Image is required" })}
            />
            {errors.recipeImage && (
              <span className="text-danger ms-2">{errors.recipeImage.message}</span>
            )}
          </div>

          <div className="text-end my-2">
            <button className="btn btn-success">Save</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
