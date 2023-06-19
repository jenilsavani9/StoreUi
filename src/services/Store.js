import axios from "axios"

// function for edit store
export const EditStore = async (editStore) => {
    const response = await axios({
        method: 'put',
        url: `/api/store/${editStore.storeId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: {
            StoreId: editStore.storeId,
            StoreName: editStore.storeName,
            AddressLine1: editStore.addressLine1,
            AddressLine2: editStore.addressLine2,
            PostalCode: editStore.postalCode,
            LocationLink: editStore.locationLink,
            Status: "active"
        }
    })
    return response;
}

// for add stores
export const AddStoreService = async (data, userId) => {
    const response = await axios({
        method: 'post',
        url: `/api/store`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: {
            UserId: userId,
            StoreName: data.StoreName,
            AddressLine1: data.AddressLine1,
            AddressLine2: data.AddressLine2,
            CountryId: data.Country,
            StateId: data.State,
            CityId: data.City,
            PostalCode: data.PostalCode,
            LocationLink: data.LocationLink,
            Status: "active"
        }
    })
    return response;
}

// delete stores
export const DeleteStoreService = async (storeId) => {
    const response = await axios({
        method: 'delete',
        url: `/api/store/${storeId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    return response;
}

// function for file upload
export const CSVUpload = async (formData) => {
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    const response = await axios.post('/api/File/Upload', formData)
    return response;
}

export const GetStoresByUserId = async (userId, token) => {
    const response = await axios({
        method: 'get',
        url: `/api/store?UserId=${userId}`,
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
}

export const GetFeaturesByStoreId = async (storeId, token) => {
    const StoreFeature = await axios({
        method: 'get',
        url: `/api/StoreFeature/Store?StoreId=${storeId}`,
        headers: { Authorization: `Bearer ${token}` },
    });
    return StoreFeature;
}

export const StoreLocationService = async () => {
    const response = await axios({
        method: 'get',
        url: `/api/store/locations`,
    })
    return response;
}