import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import noData from "../../../assets/no data.svg";
import { useForm,toast,callApi,Modal } from "../../../utls/index";
import Loading from "../../../SharedModule/Components/Loading/Loading";



export default function CategoriesList() {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const [handelLoadingOfModal, sethandelLoadingOfModal] = useState(false);
  function getCategoryList() {
    setisLoading(true);
    callApi({ path: "Category/", pageNumber: "1", method: "get" ,logedIn:true})
      .then((result) => {
        setCategoryList(result?.data?.data);
        setisLoading(false);
      })
      .catch((errors) => {
        toast(errors.message || "error");
        setisLoading(false);
      });
  }
  useEffect(() => {
    getCategoryList();
  }, []);

  // handel model --
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState("");
  const [modelState, setModelState] = useState("close");
  const handleShow = () => setShow(true);
  let {
    register,
    
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  //--- add
  function addNewCategory(data) {
    sethandelLoadingOfModal(true)
    callApi({method:"post",path:"Category/",data,logedIn:true})
      .then((result) => {
        sethandelLoadingOfModal(false)
        handleClose();
        getCategoryList();
        toast("Success");
      })
      .catch((error) => {
        sethandelLoadingOfModal(false)
        toast(error.message || "faild");
      });
  }
  function showAddModal() {
    setValue("name", "");
    setModelState("Add");
  }
  //--- delete

  function deleteCategory(e) {
    e.preventDefault();
    callApi({method:"delete",path:`Category/${itemId}`,logedIn:true})
    .then((result) => {
      handleClose();
      getCategoryList();
      toast("Delete Successfully");
    })
    .catch((error) => {
      toast("Faild");
      handleClose();
    });

  }
  function showDeleteModal(id) {
    setModelState("Delete");
    setItemId(id);
  }
  //--- update
  function showUpdateModal(categoryItem) {
    setItemId(categoryItem.id);
    setValue("name", categoryItem.name);
    setModelState("Update");
  }
  function updateCategory(data) {
    sethandelLoadingOfModal(true)
    callApi({method:"put",path:`Category/${itemId}`,data,logedIn:true})
      .then((result) => {
        handleClose();
        sethandelLoadingOfModal(false)
        getCategoryList();
        toast("Success");
      })
      .catch((error) => {
        sethandelLoadingOfModal(false)
        toast(error.message || "faild");
      });
  }
  const handleClose = () => setModelState("close");

  return (
    <>
      <div>
        <Header />
        <div className="d-flex justify-content-center py-4">
          <div className="col-md-6">
            <div>
              <h4>Categories Table Details</h4>
              <span>You can check all details</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-end">
              <button onClick={showAddModal} className="btn btn-success me-1">
                Add New Category
              </button>
            </div>
          </div>
        </div>
        {isLoading?<Loading/>:categoryList ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {categoryList?.map((category) => (
              <tbody key={category.id}>
                <tr>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
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
                            onClick={() => showUpdateModal(category)}
                            className="px-2 py-1 btn"
                          >
                            <i className="fa-regular fa-pen-to-square text-success"></i>{" "}
                            Update
                          </p>
                        </li>
                        <li>
                          <p
                            onClick={() => showDeleteModal(category.id)}
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
        ) : (
          <NoData />
        )}
      </div>

      <Modal className="p-5" show={modelState == "Add"} onHide={handleClose}>
        <form onSubmit={handleSubmit(addNewCategory)} className="p-4">
          <h2 className="mb-5">Add Category</h2>
          <input
            type="text"
            className="form-control"
            placeholder="Category Name"
            {...register("name", { required: "Field is required" })}
          />
          {errors.name && (
            <span className="text-danger ms-2">{errors.name.message}</span>
          )}
          <hr />
          <div className="text-end">
            <button className="btn btn-success px-4">{handelLoadingOfModal?<Loading/>:<span>Save</span>}</button>
          </div>
        </form>
      </Modal>

      <Modal className="p-5" show={modelState == "Delete"} onHide={handleClose}>
        <form
          onSubmit={deleteCategory}
          className="p-4 text-center"
        >
          <img src={noData} alt="#" />
          <h5 className="mb-5">Delete This Category ?</h5>
          <span className="text-muted">
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </span>
          <hr />
          <div className="text-end">
            <button
              className="btn btn-danger px-4"
            >
              Delete this item
            </button>
          </div>
        </form>
      </Modal>

      <Modal className="p-5" show={modelState == "Update"} onHide={handleClose}>
        <form onSubmit={handleSubmit(updateCategory)} className="p-4">
          <h2 className="mb-5">Add Category</h2>
          <input
            type="text"
            className="form-control"
            placeholder="Category Name"
            {...register("name", { required: "Field is required" })}
          />
          {errors.name && (
            <span className="text-danger ms-2">{errors.name.message}</span>
          )}
          <hr />
          <div className="text-end">
            <button className="btn btn-success px-4">{handelLoadingOfModal?<Loading/>:<span>Save</span>}</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
