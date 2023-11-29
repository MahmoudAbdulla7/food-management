import axios from "axios";
export function callApi({
  path,
  method,
  pageNumber=1,
  data,
  pageSize=5,
  logedIn = false,
} = []) {

    const url = `https://upskilling-egypt.com:443/api/v1/`
    const full_url=`${url}${path}`

  if (method == "get"&&logedIn==true) {
    return axios.get(`${full_url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminTkn")}`,
      },
      params: {
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    });
  } else if (logedIn == true && method != "get") {

    if ((path == "Recipe/" && method !== "delete")) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
         if (key ==! "recipeImage") {
           return formData.append(key, value);
         }else if(key=="price"||key=="tagId"||key=="categoriesIds"){
           return formData.append(key, Number(value));
         }
         return formData.append(key, value[0]);
       });
        
      return axios[method](`${full_url}`,data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminTkn")}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }
    
    if (data) {
        return axios[method](`${full_url}`,data ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminTkn")}`,
            },
          });
    }
    return axios[method](`${full_url}` ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminTkn")}`,
        },
      });

  }
  return axios[method](`${full_url}`, data);
}
