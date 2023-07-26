import axios from "axios";


export const LoadFeature = async () => {
  const UserId = localStorage.getItem('UserId');
  const response = await axios({
    method: 'get',
    url: `api/Feature?UserId=${UserId}`,
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
      userId: userId,
      name: featureName,
      description: featureDescription
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
      id: featureId,
      userId: userId,
      name: featureName,
      description: featureDescription
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