import React, { useEffect, useState } from 'react'
import Navbar from "../components/layout/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { BASE_URL } from '../constants/regex';
import FormError from '../components/ui/User/FormError';

function Users() {

    const nav = useNavigate();
    const [users, setUsers] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const [loader, setLoader] = useState(false);
    const [userCount, setUserCount] = useState(0);

    const handleAddUserSubmit = async (event) => {
        event.preventDefault();

        // validation JS Code.
        (() => {
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
        })()

        setLoader(true);
        try {
            setToken(localStorage.getItem('token'));
        } catch (error) {
            swal.fire({
                title: 'Error!',
                text: "User Not Valid!",
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }

        try {

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
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");

            swal.fire({
                title: 'Success',
                text: "User Added",
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            nav('/Users');
            LoadUsersData();
        } catch (error) {
            swal.fire({
                title: 'Error!',
                text: error.response.data,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        setLoader(false);
    }

    const checkTokenExpirationMiddleware = () => {
        try {
            const token = localStorage.getItem("token");
            if (!token && jwtDecode(token).exp < Date.now() / 1000) {
                localStorage.clear();
                nav('/login');
            }
            if (!token || jwtDecode(token).role != "1") {
                nav('/404');
            }
        } catch (error) {
            localStorage.clear();
            nav('/login')
        }
    };

    async function LoadUsersData() {
        checkTokenExpirationMiddleware();
        try {
            const response = await axios({
                method: 'post',
                url: `/api/Admin/User/Get?pageIndex=${pageIndex}&search=j`,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            setUsers(response.data.result)
            setUserCount(response.data.userCount)
        } catch (error) {
            checkTokenExpirationMiddleware();
        }
    }

    useEffect(() => {
        LoadUsersData();
    }, [])

    useEffect(() => {
        LoadUsersData();
    }, [pageIndex])

    async function DeleteUser(event) {
        try {
            const response = await axios({
                method: 'post',
                url: `/api/Admin/User/Delete?userId=${event.target.value}`,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            LoadUsersData();
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="d-flex justify-content-between mt-3">
                    <h2>Users</h2>
                    {/* add users modal */}

                    <div>
                        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i className="bi bi-plus-lg"></i> Add Users
                        </button>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Users</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="row g-3 needs-validation" noValidate onSubmit={handleAddUserSubmit}>
                                            <div className="col-md-6">
                                                <label htmlFor="validationCustom01" className="form-label">First name</label>
                                                <input type="text" className="form-control" id="validationCustom01" minlength="5" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                                <FormError message={"First Name is not Valid"} />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="validationCustom02" className="form-label">Last name</label>
                                                <input type="text" className="form-control" id="validationCustom02" minlength="5" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                                <FormError message={"Last Name is not valid."} />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="validationCustom03" className="form-label">Email</label>
                                                <input type="email" className="form-control" id="validationCustom03" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                <FormError message={"Email is not valid."} />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="validationCustom04" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="validationCustom04" minlength="5" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                                <FormError message={"Password is not valid."} />
                                            </div>
                                            <div className="col-12 d-flex justify-content-end">
                                                {loader ? <button className="btn btn-dark" type="submit" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Loading...</button> : <button className="btn btn-dark" type="submit">Save</button>}

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div>

                    <div>
                        <table className="table table-striped" id='user-table'>
                            <thead id='user-table-header'>
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => {
                                    return (<tr key={u.userId}>
                                        <td>{u.firstName}</td>
                                        <td>{u.lastName}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <h5>
                                                {u.status == "active" ? <span className="badge bg-success">Active</span> : u.status == "deactive" ? <span className="badge bg-danger">Deactive</span> : <span className="badge bg-secondary">Pending</span>}
                                            </h5>
                                        </td>
                                        <td>{u.roles=="1"? "Admin" : "Customer"}</td>
                                        <td>{(u.status != "deactive" && u.roles != "1") ? <button type="button" class="btn btn-outline-danger btn-sm" value={u.userId} onClick={DeleteUser}>Delete</button> : ""}</td>
                                    </tr>)
                                })}
                            </tbody>

                        </table>
                        <div className='d-flex justify-content-center'>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item me-2">
                                        <a class="page-link btn text-dark" onClick={() => { (pageIndex - 1) < 0 ? setPageIndex(pageIndex) : setPageIndex(pageIndex - 1) }} aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    {Array.from({ length: (userCount / 10) + 1 }, (_, index) => index + 1).map(i => {
                                        return <li class="page-item me-2 "><a class="page-link btn text-dark" onClick={() => setPageIndex(i - 1)}>{i}</a></li>
                                    })}

                                    <li class="page-item ">
                                        <a class="page-link btn text-dark" onClick={() => { (pageIndex + 1) > userCount / 10 ? setPageIndex(pageIndex) : setPageIndex(pageIndex + 1) }} aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Users;
