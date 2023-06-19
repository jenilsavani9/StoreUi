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

export const AddFeaturesService = async (userId, featureName, featureDescription) => {
    const response = await axios({
        method: 'post',
        url: `/api/feature`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: {
            featuresId: 0,
            userId: userId,
            featuresName: featureName,
            featuresDescription: featureDescription
        }
    })
    return response;
}

export const EditFeatureService = async (featureId, userId, featureName, featureDescription) => {
    const response = await axios({
        method: 'put',
        url: `/api/feature/${featureId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: {
            featuresId: featureId,
            userId: userId,
            featuresName: featureName,
            featuresDescription: featureDescription
        }
    })
    return response;
}

export const DeleteFeatureService = async (featureId) => {
    const response = await axios({
        method: 'delete',
        url: `/api/feature/${featureId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    return response;
}