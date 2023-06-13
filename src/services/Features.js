import axios from "axios"
import jwt_decode from "jwt-decode";


export const LoadFeature = async () => {
    const decoded = jwt_decode(localStorage.getItem('token'));
    const response = await axios({
        method: 'get',
        url: `api/Feature?UserId=${decoded.UserId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    return response;
}