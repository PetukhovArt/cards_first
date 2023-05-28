import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/authSlice";

export const Register = () => {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    dispatch(
      authThunks.register({ email: "s1abak38@gmail.com", password: "Grebeshok123" })
    );
  };

  return (
    <div className="">
      <h1>Register</h1>
      <button onClick={registerHandler}>Register</button>
    </div>
  );
};
