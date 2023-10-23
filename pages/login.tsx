import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoginAPI from "@/services/api/auth/login";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { storeToken } from "@/store/slices/token-slice";
const Login = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const LoginValidationSchema = Yup.object().shape({
    usr: Yup.string().email("Invalid email").required("Email is required"),
    pwd: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required"),
  });

  const handlePassword = (e: any) => {
    e.preventDefault();
    setPasswordHidden(!passwordHidden);
  };

  const handleSubmit = async (values: any) => {
    // console.log("login creds", values);
    const loginUser = await LoginAPI(values);
    // console.log("login creds success", loginUser);
    if (loginUser?.data?.message?.msg === "success") {
      toast.success("Login Successful", {
        autoClose: 3000,
        // Close the notification after 3 seconds
      });
      dispatch(storeToken(loginUser.data.message.data.access_token));
      router.push("/candidates");
    } else {
      toast.error(
        "Login failed. Please check your credentials and try again.",
        {
          autoClose: 5000, // Close the notification after 5 seconds
        }
      );
    }
  };

  return (
    <div
      className={`bg-white overflow-hidden ${styles.login_wrapper} shadow-lg`}
    >
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="bg-white-2 h-100 p-5">
            <div className="mt-2 mb-2 text-center">
              <h5>Log In</h5>
            </div>
            <Formik
              initialValues={{
                usr: "",
                pwd: "",
              }}
              validationSchema={LoginValidationSchema}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form>
                <div className="form-group">
                  <label
                    htmlFor="email"
                    className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  >
                    E-mail
                  </label>
                  <Field type="email" className="form-control" name="usr" />
                  <ErrorMessage
                    name="usr"
                    component="div"
                    className={`${styles.error_message}`}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="password"
                    className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  >
                    Password
                  </label>
                  <div className="position-relative">
                    <div className="d-flex justify-content-center align-items-center position-relative">
                      <Field
                        type={passwordHidden ? "password" : "text"}
                        className="form-control"
                        name="pwd"
                      />
                      <button
                        className={`${styles.password_icon}`}
                        onClick={(e: any) => handlePassword(e)}
                      >
                        {passwordHidden ? (
                          <i className="fas fa-eye"></i>
                        ) : (
                          <i className="fas fa-eye-slash"></i>
                        )}
                      </button>
                    </div>
                  </div>
                  <ErrorMessage
                    name="pwd"
                    component="div"
                    className={`${styles.error_message}`}
                  />
                </div>

                <div className="form-group mb-8 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-medium w-50 rounded-5 text-uppercase"
                  >
                    Log in
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
