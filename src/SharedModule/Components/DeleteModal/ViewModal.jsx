import React, { useEffect, useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import Loading from "../Loading/Loading";
import NoData from "../NoData/NoData";
import { AuthContext } from "../../../Context/authContext";
import axios, {toast} from '../../../utls/index'


export default function ViewModal({ modelState, itemId, handleClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(false);
  let { url, Authorization } = useContext(AuthContext);

  function getItemDetailes(recipeId) {
    setIsLoading(true);
    axios
      .get(`${url}Recipe/${recipeId}`, {
        headers: { Authorization: Authorization },
      })
      .then((res) => {
        setIsLoading(false);
        setItem(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err?.data?.message || "Faild");
      });
  }

  useEffect(() => {
    if (itemId !== null) {
      getItemDetailes(itemId);
    }
  }, [itemId]);


  function addToFavourite(e) {
    e.preventDefault();
    axios.post(`https://upskilling-egypt.com:443/api/v1/userRecipe/`,{"recipeId":itemId},{
      headers:{Authorization:Authorization}
    }).then(res=>{
      handleClose();
  toast.success(`recipe has been added successfuly`)
    }).catch(err=>{
      toast.error( err.data.message ||`Failed`)

    })
  }

  return (
    <Modal className="p-5" show={modelState == "View"} onHide={handleClose}>
      {isLoading ? (
        <div className="p-5 fs-1 text-success">
          <Loading />
        </div>
      ) : item ? (
        <form onSubmit={addToFavourite} className="p-4">
          <h3>Recipe Details</h3>
          {item.imagePath && (
            <div className="image text-center mt-3">
              <img
                className="w-50 "
                src={`https://upskilling-egypt.com/${item.imagePath}`}
                alt="recipe image"
              />
            </div>
          )}
          <div className="name">
            <h6 className="mt-3 mb-0">Recipe name :</h6>
            <p className="text-muted m-0">{item.name}</p>
          </div>
          <div className="description">
            <h6 className="mt-3 mb-0">Recipe description :</h6>
            <p className="text-muted m-0">{item.description}</p>
          </div>
          <div className="text-end">
            <button className="btn btn-success px-4">
            <i className="fs-4 fa-solid fa-heart-circle-plus"></i>

            </button>
          </div>
        </form>
      ) : (
        <NoData />
      )}
    </Modal>
  );
}
