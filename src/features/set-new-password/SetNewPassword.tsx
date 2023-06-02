import c from "features/set-new-password/styles.module.scss";
import React, { useEffect } from "react";
import { SuperButton } from "components/super-button/SuperButton";
import { RouteNames } from "routes/routes";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { authThunks, setPasswordTC } from "features/auth/authSlice";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

type Inputs = {
  password: string;
};
export const SetNewPassword = () => {
  const { token } = useParams();

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const regexPassword = /[A-Za-z0-9]{8,}/;
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      authThunks.setPasswordTC({
        password: data.password,
        resetPasswordToken: token ? token : "no token",
      })
    )
      .unwrap()
      .then((res) => {
        if (res.res.data.info) {
          navigate(RouteNames.LOGIN);
        }
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={`container ${c.formContainer}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={c.formWrapper}>
        <FormControl>
          <FormLabel>
            <h3>Create new password</h3>
          </FormLabel>
          <FormGroup>
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

            <div className={c.description}>
              Create new password and we will send you further instructions to email
            </div>
            <div className={c.actions}>
              <SuperButton name={"Create new password"} type={"submit"} />
            </div>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  );
};
