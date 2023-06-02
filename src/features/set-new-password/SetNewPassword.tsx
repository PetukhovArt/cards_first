import c from "features/forgot-password/Forgot.module.scss";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { NavLink, useNavigate } from "react-router-dom";
import { RouteNames } from "routes/routes";
import { SuperButton } from "components/super-button/SuperButton";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { authThunks } from "features/auth/authSlice";

type Inputs = {
  email: string;
};

export const SetNewPassword = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("forgot");
    // dispatch(
    //   authThunks.loginTC({
    //     email: data.email,
    //   })
    // );
  };

  return (
    <div className={`container ${c.formContainer}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={c.formWrapper}>
        <FormControl>
          <FormLabel>
            <h3>Forgot your password?</h3>
          </FormLabel>
          <FormGroup>
            <TextField
              label="Email"
              // color="secondary"
              variant="filled"
              margin={"normal"}
              {...register("email", {
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
            <span>Enter your email address and we will send you further instructions </span>

            <div className={c.actions}>
              <SuperButton name="Send Instructions" type={"submit"} borderRadius={"5px"} />
              <span className={c.question}>Did you remember your password?</span>
              <NavLink to={RouteNames.LOGIN} className={c.linkRegister}>
                Try logging in
              </NavLink>
            </div>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  );
};
