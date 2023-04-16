import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import toastr from "toastr";
import styles from "../../styles/Home.module.css";
import authStyles from "../../styles/Auth.module.css";
import { useLoginUser } from "../../api/ApiClient";
import produce from "immer";

function Login(props) {
  const navigate = useNavigate();

  // console.log(props.location.state.from);

  const [formData, setFormData] = useState({
    email: undefined,
    password: undefined,
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [disableButton, setDisableButton] = useState(true);

  const loginUser = useLoginUser();

  const handleValidation = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setFormErrors(
          produce((draft) => {
            if (value === undefined || value === null || value.length === 0) {
              draft.email = "Email is required";
              setDisableButton(true);
            } else {
              draft.email = "";
              setDisableButton(false);
            }
          })
        );
        break;
      case "password":
        setFormErrors(
          produce((draft) => {
            if (value === undefined || value === null || value.length < 1) {
              draft.password = "Password is required";
              setDisableButton(true);
            } else {
              draft.password = "";
              setDisableButton(false);
            }
          })
        );

        break;
      default:
        break;
    }

    setFormData(
      produce((draft) => {
        draft[name] = value;
      })
    );
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (
      formErrors.email ||
      formErrors.password ||
      formData.email === undefined ||
      formData.password === undefined
    ) {
      toastr.error("Fill the missing fields");
      return;
    }

    console.log(formData);
    await loginUser(formData)
      .then((response) => {
        if (response.data.successful) {
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.result.token)
          );

          if (response.data.result.permission === 1) {
            localStorage.setItem("hasAccess", JSON.stringify(true));
            // navigate("category");
            
            
            // navigate("category");
          } else {
            localStorage.setItem("hasAccess", JSON.stringify(false));
          }
          toastr.success("Signed in");

          const relPath = localStorage.getItem('relPath');

          console.log(relPath, "relpath from login")

          if (relPath) {
            console.log("relpath hit");
            navigate(relPath);
            localStorage.removeItem('relPath')
          }
          else{
            navigate("/category");
          }
          
        } else {
          console.log(response.data.errorMessage)
          toastr.error("Unauthorized");
        }
      })
      .catch((error) => {
        console.log(error);
        toastr.error("Unauthorized");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <h2 className={styles.mainTitle}>Login</h2>
        <form
          className={authStyles.formBox}
          onSubmit={(e) => handleSubmitForm(e)}
        >
          <div className={authStyles.formBox}>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => handleValidation(e)}
            />
            <span className={authStyles.validateText}>{formErrors.email}</span>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => handleValidation(e)}
            />
            <span className={authStyles.validateText}>
              {formErrors.password}
            </span>
            <div className={authStyles.btnGroup}>
              <Button
                type="submit"
                name="Login"
                disabled={disableButton}
                color={
                  disableButton ? "rgb(47, 49, 146)" : "rgb(231, 246, 254)"
                }
                backgroundColor={
                  disableButton ? "rgb(231, 246, 254)" : "rgb(47, 49, 146)"
                }
                border={
                  disableButton
                    ? "2px solid rgb(47, 49, 146)"
                    : "2px solid rgb(231, 246, 254)"
                }
              />
              &nbsp;&nbsp;
              <Link to="/category">
                <Button name="Back" />
              </Link>
            </div>
          </div>
        </form>
        <br />
        <p className={authStyles.linkText}>
          Don't have an account?
          <Link
            to="/register"
            className={`${authStyles.linkText} ${authStyles.linkTextSec}`}
          >
            {" "}
            Click to register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
