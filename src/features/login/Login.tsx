import React, { useEffect } from "react";
import c from "features/login/Login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { authThunks } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { RootState } from "app/store";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { SuperButton } from "components/super-button/SuperButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { RouteNames } from "routes/routes";

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const regexPassword = /[A-Za-z0-9]{8,}/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      authThunks.loginTC({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      })
    );
  };
  const { control } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/profile");
    }
  }, [isAuth]);

  return (
    <div className={`container ${c.formContainer}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={c.formWrapper}>
        <FormControl>
          <FormLabel>
            <h3>Sign in</h3>
          </FormLabel>
          <FormGroup>
            <TextField
              label="Email"
              variant="outlined"
              margin={"normal"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: regexEmail,
                  message: "Email format is wrong",
                },
                maxLength: {
                  value: 50,
                  message: "Максимум 50 символов",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <TextField
              variant="outlined"
              type={showPassword ? "text" : "password"}
              label="Password"
              margin={"normal"}
              {...register("password", {
                required: "Password required",
                pattern: {
                  value: regexPassword,
                  message: "Password length must be > 8",
                },
                minLength: {
                  value: 5,
                  message: "Min. 5 symbols",
                },
                maxLength: {
                  value: 20,
                  message: "Max. 20 symbols",
                },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <div className={c.rememberMeBlock}>
              <FormControlLabel
                className={c.checkBoxContainer}
                label="Remember Me"
                control={<Checkbox {...register("rememberMe")} />}
              />
            </div>
            <div className={c.forgotWrapper}>
              <NavLink to={RouteNames.FORGOT_PASSWORD} className={c.linkForgot}>
                Forgot password?
              </NavLink>
            </div>

            <SuperButton name="Sign In" type={"submit"} borderRadius={"5px"} />
            <span className={c.dontHave}>Don't have an account?</span>
            <NavLink to={RouteNames.REGISTER} className={c.linkRegister}>
              Sign Up
            </NavLink>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  );
};
