import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinners from "../components/ui/Ui/Spinner";
import { TOAST_CONSTANT } from "../constants/constant";
import { GetUserInfoData, LoginResponse } from "../services/User";

function Login() {
  // for getting device information use : react-device-detect
  // const [selectors, data] = useDeviceSelectors(window.navigator.userAgent);

  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const changeInputPassword = (event) => {
    setPassword(event.target.value);
  };

  const changeInputEmail = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token != null) {
      nav("/");
    }
  }, []);

  const SubmitLoginForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // const { osName, browserName } = selectors;

    if (email == "") {
      toast.error("🦄 Email Can't be null!", {
        position: TOAST_CONSTANT.position,
        autoClose: TOAST_CONSTANT.autoClose,
        theme: TOAST_CONSTANT.theme,
      });
    }
    if (password == "" || password.length < 5) {
      toast.error("🦄 Password is not valid!", {
        position: TOAST_CONSTANT.position,
        autoClose: TOAST_CONSTANT.autoClose,
        theme: TOAST_CONSTANT.theme,
      });
    } else {
      var LastLogin = {};
      try {
        const DeviceInfo = await GetUserInfoData();
        const date = new Date();
        LastLogin = {
          // "osName": osName,
          // "browserName": browserName,
          IPv4: DeviceInfo.data.IPv4,
          date: date,
        };
      } catch (error) { }

      try {
        const response = await LoginResponse(
          email,
          password,
          JSON.stringify(LastLogin)
        );
        if (response.data.status == 200) {
          localStorage.setItem("token", response.data.payload.token);
          localStorage.setItem(
            "FirstName",
            response.data.payload.user.firstName
          );
          localStorage.setItem("LastName", response.data.payload.user.lastName);
          localStorage.setItem("UserId", response.data.payload.user.id);
          nav("/");
        }
      } catch (error) {
        toast.error("🦄 Invalid Credentials", {
          position: TOAST_CONSTANT.position,
          autoClose: TOAST_CONSTANT.autoClose,
          theme: TOAST_CONSTANT.theme,
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="container-md login-form" id="login-form">
      <form className="row align-items-center" id="login-form-values">
        <h2>Login</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={changeInputEmail}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={changeInputPassword}
          />
        </div>
        <div>
          {isLoading ? (
            <Spinners />
          ) : (
            <button
              onClick={SubmitLoginForm}
              type="button"
              className="btn btn-dark px-3"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
