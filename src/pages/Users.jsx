import "bootstrap-icons/font/bootstrap-icons.css";
import jwtDecode from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormError from '../components/ui/User/FormError';
import { TOAST_CONSTANT } from '../constants/constant';
import { AddUsers, DeleteUsers, GetUsers } from '../services/User';
import { Table } from "react-bootstrap";

function Users() {

    const nav = useNavigate();
    const [users, setUsers] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const [userCount, setUserCount] = useState(0);

    const CloseRef = useRef();

    (() => {
        'use strict'
        const forms = document.querySelectorAll('.needs-validation')
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

    const handleAddUserSubmit = async (event) => {
        event.preventDefault();
        setLoader(true);

        try {
            const response = await AddUsers(firstName, lastName, email, password);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            CloseRef.current.click();
            event.target.reset();
            toast.success('🦄 User Added successfully!', {
                position: TOAST_CONSTANT.position,
                autoClose: TOAST_CONSTANT.autoClose,
                theme: TOAST_CONSTANT.theme,
            });
            nav('/Users');
            LoadUsersData();
        } catch (error) {
            toast.error(`🦄 ${error.response.data.message}!`, {
                position: TOAST_CONSTANT.position,
                autoClose: TOAST_CONSTANT.autoClose,
                theme: TOAST_CONSTANT.theme,
            });
        }
        setLoader(false);
    }

    async function LoadUsersData() {
        try {
            const response = await GetUsers(pageIndex)
            setUsers(response.data.payload.userList)
            setUserCount(response.data.payload.userCount)
        } catch (error) {
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || jwtDecode(token).role != "admin") {
            nav('/404');
        }
        LoadUsersData();
    }, [])

    useEffect(() => {
        LoadUsersData();
    }, [pageIndex])

    async function DeleteUser(event) {
        try {
            await DeleteUsers(event.target.value);
            LoadUsersData();
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
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
                                                <input type="text" className="form-control" id="validationCustom01" minLength="5" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                                <FormError message={"First Name is not Valid"} />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="validationCustom02" className="form-label">Last name</label>
                                                <input type="text" className="form-control" id="validationCustom02" minLength="5" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                                <FormError message={"Last Name is not valid."} />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="validationCustom03" className="form-label">Email</label>
                                                <input type="email" className="form-control" id="validationCustom03" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                <FormError message={"Email is not valid."} />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="validationCustom04" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="validationCustom04" minLength="5" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                                <FormError message={"Password is not valid."} />
                                            </div>
                                            <div className="col-12 d-flex justify-content-end">
                                                {loader ? <button className="btn btn-dark" type="submit" disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Loading...</button> : <button className="btn btn-dark" type="submit">Save</button>}

                                            </div>
                                            <button type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal" ref={CloseRef} >Close</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div>

                    <div>
                        <Table striped bordered hover>
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
                                {users.map((u, index) => {
                                    return (<tr key={index}>
                                        <td>{u.firstName}</td>
                                        <td>{u.lastName}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <h5>
                                                {u.status == "active" ? <span className="badge bg-success">Active</span> : u.status == "deactive" ? <span className="badge bg-danger">Deactive</span> : <span className="badge bg-secondary">Pending</span>}
                                            </h5>
                                        </td>
                                        <td>{u.role == "admin" ? "Admin" : "Customer"}</td>
                                        <td>{(u.status != "deactive" && u.role != "admin") ? <button type="button" className="btn btn-danger btn-sm" value={u.id} onClick={DeleteUser}>Delete</button> : ""}</td>
                                    </tr>)
                                })}
                            </tbody>

                        </Table>
                        <div className='d-flex justify-content-center'>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item me-2">
                                        <a className="page-link btn text-dark" onClick={() => { (pageIndex - 1) < 0 ? setPageIndex(pageIndex) : setPageIndex(pageIndex - 1) }} aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    {Array.from({ length: (userCount / 10) + 1 }, (_, index) => index + 1).map((i, index) => {
                                        return <li key={index} className="page-item me-2 "><a className="page-link btn text-dark" onClick={() => setPageIndex(i - 1)}>{i}</a></li>
                                    })}

                                    <li className="page-item ">
                                        <a className="page-link btn text-dark" onClick={() => { (pageIndex + 1) > userCount / 10 ? setPageIndex(pageIndex) : setPageIndex(pageIndex + 1) }} aria-label="Next">
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
