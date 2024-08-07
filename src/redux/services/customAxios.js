import axios from "axios";

function getAxios() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (currentUser){
        return axios.create({
            baseURL:'http://localhost:8080/',
            headers:{"Authorization":`Bearer ${currentUser.accessToken}`}
        })
    }else {
        return axios.create({
            baseURL:'http://localhost:8080/'
        })
    }

}
export default getAxios;