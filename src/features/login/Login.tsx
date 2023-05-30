import React, { useEffect } from "react";
import c from "features/login/Login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { authThunks } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { RootState } from "app/store";

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
  multipleErrorInput: string;
};

export const Login = () => {
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const emailRegex = /^\S+@\S+\.\S+$/;
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      authThunks.login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      })
    );
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/profile");
    }
  }, [isAuth]);

  return (
    <div className={c.container}>
      <div className={c.loginForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={c.formWrapper}>
          <h1>Форма логина</h1>
          <input
            {...register("email", {
              required: "Ввод почты обязателен (ваша почта)",
              pattern: {
                value: emailRegex,
                message: "Некорректный формат почты",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
            })}
          />

          <ErrorMessage
            errors={errors}
            name="email"
            render={({ messages }) => {
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                : null;
            }}
          />

          <input
            type="password"
            {...register("password", {
              required: "Ввод пароля обязателен",
              // pattern: {
              //     value: /\d+/,
              //     message: 'This input is number only.'
              // },
              minLength: {
                value: 5,
                message: "Минимум 5 символов",
              },
              maxLength: {
                value: 20,
                message: "Максимум 20 символов",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ messages }) => {
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                : null;
            }}
          />
          <label htmlFor="rememberMe">Remember me</label>
          <input id="rememberMe" type="checkbox" {...register("rememberMe")} />

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
