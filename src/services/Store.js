import axios from "axios"

// function for edit store
export const EditStore = async (editStore) => {
    const response = await axios({
        method: 'post',
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