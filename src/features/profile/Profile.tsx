import React, { useEffect } from "react";
import s from "features/profile/Profile.module.scss";
import { SuperButton } from "common/SuperButton";
import { useAppDispatch, useAppSelector } from "app/hooks";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RootState } from "app/store";
import ava from "assets/images/ava.png";
import { Navigate, useNavigate } from "react-router-dom";
import { authThunks } from "features/auth/authSlice";
import { EditableSpan } from "common/EditableSpan/EditableSpan";
import { IconButton } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.profile);
  const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);
  const resStatus = useAppSelector((state: RootState) => state.app.resStatus);

  const onClickLogoutHandler = () => {
    dispatch(authThunks.logoutTC());
  };
  const onChangeNameHandler = (name: string) => {
    dispatch(authThunks.updateUserTC({ name }));
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  return (
    <div className={s.profileBlock} id="profile">
      <div className={s.headActions}>
        <SuperButton
          name={"Back to Packs"}
          redirectPath={"/packs"}
          startIcon={<ArrowBackIcon />}
          color={"primary"}
        />
      </div>
      <div className={`container ${s.profileContainer}`}>
        <div className={s.profile}>
          <h2>Personal Information</h2>
          <div className={s.info}>
            <div className={s.avatarBlock}>
              <img
                className={s.avatar}
                src={user && user.avatar ? user.avatar : ava}
                alt="userAva"
              />
              <IconButton className={s.photoIcon} aria-label="change photo">
                <AddAPhotoIcon />
              </IconButton>
            </div>
            <EditableSpan
              value={user ? user.name : "User name"}
              onChange={onChangeNameHandler}
              // disabled={props.taskEntityStatus === 'loading'}
              disabled={false}
            />
            <span style={{ opacity: 0.5 }}>{user ? user.email : "example@mail.com"}</span>
          </div>
          <SuperButton
            onClickCallBack={onClickLogoutHandler}
            name={"Logout"}
            startIcon={<LogoutIcon />}
            width={"127px"}
            height={"36px"}
            borderRadius={"10px"}
            color={"primary"}
          />
        </div>
      </div>
    </div>
  );
};
