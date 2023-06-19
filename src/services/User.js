import axios from "axios"

export const LoginResponse = async (email, password, LastLogin) => {
    const response = await axios({
        method: 'post',
        url: `/api/Login`,
        data: {
            emailId: email,
            password: password,
            LastLogin: LastLogin
        }
    })
    return response
}

export const PasswordResetByUser = async (token, email, tempPass, newPass) => {
    const response = await axios({
        method: 'post',
        headers: { Authorization: `Bearer ${token}` },
        url: `/api/Login/resetpassword?email=${email}&password=${tempPass}&newPassword=${newPass}`
    })
    return response
}

export const AddUsers = async (firstName, lastName, email, password) => {
    const response = await axios({
        method: 'post',
        url: `/api/Admin/User/Add`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
    })
    return response;
}

export const GetUsers = async (pageIndex) => {
    const response = await axios({
        method: 'get',
        url: `/api/Admin/User/Get?pageIndex=${pageIndex}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return response;
}

export const DeleteUsers = async (userId) => {
    const response = await axios({
        method: 'delete',
        url: `/api/Admin/User/Delete?userId=${userId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return response;
}

export const GetUserInfoData = async () => {
    const DeviceInfo = await axios({
        method: 'get',
        url: 'https://geolocation-db.com/json/',
    })
    return DeviceInfo;
}

export const ValidateUserEmailService = async (userId, validateToken) => {
    const response = await axios({
        method: 'get',
        url: `/api/Login/validate?UserId=${userId}&token=${validateToken}`
    })
    return response;
}