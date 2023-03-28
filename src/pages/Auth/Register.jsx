import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import toastr from "toastr";
import styles from "../../styles/Home.module.css";
import authStyles from "../../styles/Auth.module.css";
import { useRegisterUser } from "../../api/ApiClient";
import produce from "immer";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [disableButton, setDisableButton] = useState(true);

  const registerUser = useRegisterUser();

  const handleValidation = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFormErrors(
          produce((draft) => {
            if (value === undefined || value === null || value.length === 0) {
              draft.firstName = "First name is required";
              setDisableButton(true);
            } else {
              draft.firstName = "";
              setDisableButton(false);
            }
          })
        );

        break;
      case "lastName":
        setFormErrors(
          produce((draft) => {
            if (value === undefined || value === null || value.length === 0) {
              draft.lastName = "Last name is required";
              setDisableButton(true);
            } else {
              draft.lastName = "";
              setDisableButton(false);
            }
          })
        );
        break;

      case "email":
        setFormErrors(
          produce((draft) => {
            if (value === undefined || value === null || value.length === 0) {
              draft.firstName = "Email is required";
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
            if (value === undefined || value === null || value.length === 0) {
              draft.password = "Password is required";
              setDisableButton(true);
            } else if (value.length < 6) {
              draft.password = "Password must be at least 6 characters";
              setDisableButton(true);
            } else {
              draft.password = "";
              setDisableButton(false);
            }
          })
        );
        break;
      default:
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
      formData.firstName === undefined ||
      formData.lastName === undefined ||
      formData.email === undefined ||
      formData.password === undefined ||
      formErrors.firstName ||
      formErrors.lastName ||
      formErrors.password ||
      formErrors.email
    ) {
      toastr.error("Fill the missing fields");
      return;
    } else {
      await registerUser(formData)
        .then((response) => {
          if (response.data.successful) {
            console.log(response.data.result);

            localStorage.setItem(
              "token",
              JSON.stringify(response.data.result.token)
            );
            if (response.data.result.permission === 1) {
              localStorage.setItem("hasAccess", JSON.stringify(true));
              navigate("/category");
            } else {
              localStorage.setItem("hasAccess", JSON.stringify(false));
              navigate("/category");
            }
          } else {
            console.log(response.data.errorMessage);
            toastr.error(response.data.errorMessage);
          }
        })
        .catch((error) => {
          console.log(error);
          toastr.error("Unauthorized");
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <h2 className={styles.mainTitle}>Register</h2>
        <form
          className={authStyles.formBox}
          onSubmit={(e) => handleSubmitForm(e)}
        >
          <div className={authStyles.formBox}>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={(e) => handleValidation(e)}
            />
            <span className={authStyles.validateText}>
              {formErrors.firstName}
            </span>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              onChange={(e) => handleValidation(e)}
            />
            <span className={authStyles.validateText}>
              {formErrors.lastName}
            </span>
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
                name="Proceed"
                disabled={disableButton}
                color={disableButton ? "rgb(29, 26, 26)" : "hsl(38, 61%, 73%)"}
                backgroundColor={
                  disableButton ? "hsl(38, 61%, 73%)" : "rgb(29, 26, 26)"
                }
              />
              &nbsp;&nbsp;
              <Link to="/category">
                <Button name="Back" />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
