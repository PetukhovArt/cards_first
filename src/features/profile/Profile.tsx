import React from "react";
import s from "./Profile.module.css";
import SuperEditableSpan from "common/c4-SuperEditableSpan/SuperEditableSpan";
import { MuiButton } from "common/MuiButton";

export const Profile = () => {
  return (
    <div className={s.profileBlock} id="profile">
      <div className={s.headActions}>
        <MuiButton name={"Back to Packs"} color={"warning"} route={"packs"} />
      </div>
      <div className={`container ${s.profileContainer}`}>
        <div className={s.profile}>
          <h2>Personal Information</h2>
          <div className={s.info}>
            <div className={s.editableImg}>
              <img src="#" alt="userAva" />
            </div>
            <SuperEditableSpan value="Ivan" /> {/*change with name from response*/}
            <span>j&johnson@gmail.com</span>
          </div>
          <MuiButton name={"Log out"} size={"large"} />
        </div>
      </div>
    </div>
  );
};
