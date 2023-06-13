import axios from "axios";
import jwt_decode from "jwt-decode";

export const ChangeStoreFeature = async (featureIds, storeid) => {
    const decoded = jwt_decode(localStorage.getItem('token'));
    const response = await axios({
        method: 'post',
        url: `/api/StoreFeature`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: {
            featureIds: featureIds,
            StoreId: storeid,
            UserId: decoded.UserId
        }
    })
    return response;
}