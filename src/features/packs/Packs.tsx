import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Packs = () => {
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  return <div>PACKS</div>;
};
