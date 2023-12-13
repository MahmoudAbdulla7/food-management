import axios from "axios";
import { toast } from "react-toastify";

const url = `https://upskilling-egypt.com:443/api/v1/`;
let Authorization =`Bearer ${localStorage.getItem("userTkn")}`

export function customFetch({
  path,
  method,
  data,
  logedIn = false,
} = []) {
  const full_url = `${url}${path}`;

 if (logedIn == true && method != "get") {
    if (path.includes("Recipe/") && method !== "delete") {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key == !"recipeImage") {
          return formData.append(key, value);
        } else if (key == "price" || key == "tagId" || key == "categoriesIds") {
          return formData.append(key, Number(value));
        }
        return formData.append(key, value[0]);
      });

      return axios[method](`${full_url}`, formData, {
        headers: {
          Authorization: Authorization,
          "Content-Type": "multipart/form-data",
        },
      });
    }

    if (data) {
      return axios[method](`${full_url}`, data, {
        headers: {
          Authorization:Authorization,
        },
      });
    }
  }
  return axios[method](`${full_url}`, data);
}

export function getList({
  path,
  setIsLoading,
  setNumberOfPages,
  pageSize=6,
  pageNumber,
  name,
  tagId,
  categoryId,
  userName,
  groups,setList
}=[]) {
  setIsLoading(true);
  axios
    .get(`${url}${path}`, {
      headers: {
        Authorization: Authorization,
      },
      params: {
        pageSize,
        pageNumber:pageNumber,
        name,
        tagId,
        categoryId,
        userName,
        groups,
      },
    })
    .then((result) => {
      setNumberOfPages(
        Array(result.data.totalNumberOfPages)
          .fill()
          .map((_, i) => {
            return i + 1;
          })
      );
      setList(result?.data?.data);
      setIsLoading(false);
    })
    .catch((errors) => {
      setIsLoading(false);
      toast(errors?.data?.message || "error");
    });
}