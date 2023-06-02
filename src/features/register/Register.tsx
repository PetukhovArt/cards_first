import React from "react";
import c from "features/register/Register.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { authThunks } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "app/store";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { SuperButton } from "components/super-button/SuperButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { RouteNames } from "routes/routes";
import { instance, instanceHeroku } from "common/api/common.api";
import globalRouter from "common/globalRouter";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({ criteriaMode: "all" });
  const regexPassword = /[A-Za-z0-9]{8,}/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      authThunks.registerTC({
        email: data.email,
        password: data.password,
      })
    );
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const password = watch("password");
  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      return "Passwords do not match";
    }
  };

  //for redirect if response status == 201
  instanceHeroku.interceptors.response.use(function (response) {
    if (response.status === 201 && globalRouter.navigate) {
      globalRouter.navigate(RouteNames.LOGIN);
    }
    return response;
  });

  return (
    <div className={`container ${c.formContainer}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={c.formWrapper}>
        <FormControl>
          <FormLabel>
            <h3>Sign Up</h3>
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
                  message: "Max. 50 symbols",
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

            <TextField
              variant="outlined"
              type={showPassword ? "text" : "password"}
              label="Confirm Password"
              margin={"normal"}
              {...register("confirmPassword", {
                required: "Confirmation required",
                validate: validateConfirmPassword,
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
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

            <div className={c.actions}>
              <SuperButton name="Sign Up" type={"submit"} borderRadius={"5px"} width={"150px"} />
              <span className={c.dontHave}>Already have an account?</span>
              <NavLink to={RouteNames.LOGIN} className={c.link}>
                Sign In
              </NavLink>
            </div>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  );
};
