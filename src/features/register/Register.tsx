import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import c from "features/login/Login.module.scss";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";

type Inputs = {
  email: string;
  password: string;
  confirm: string;
  multipleErrorInput: string;
};

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const regexPassword = /[A-Za-z0-9]{8,}/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const emailRegex = /^\S+@\S+\.\S+$/;
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(authThunks.registerTC({ email: "s1abak38@gmail.com", password: "Grebeshok123" }));
    // dispatch(
    //   authThunks.login({
    //     email: data.email,
    //     password: data.password,
    //     confirm: data.confirm,
    //   })
    // );
  };

  return (
    <div className={c.container}>
      <div className={c.loginForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={c.formWrapper}>
          <h1>Регистрация</h1>
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
                ? Object.entries(messages).map(([type, message]) => <p key={type}>{message}</p>)
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
                ? Object.entries(messages).map(([type, message]) => <p key={type}>{message}</p>)
                : null;
            }}
          />
          {/*<label htmlFor="rememberMe">Remember me</label>*/}
          {/*<input id="rememberMe" type="checkbox" {...register("rememberMe")} />*/}

          <input
            type="password"
            {...register("confirm", {
              required: "Подтверждение пароля обязательно",
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
            name="confirm"
            render={({ messages }) => {
              return messages
                ? Object.entries(messages).map(([type, message]) => <p key={type}>{message}</p>)
                : null;
            }}
          />

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
