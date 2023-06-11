import c from "features/user/check-email/styles.module.scss";
import React from "react";
import { SuperButton } from "common/components/super-button/SuperButton";
import { RouteNames } from "routes/routes";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

export const CheckEmail = () => {
  return (
    <div className={`container ${c.formContainer}`}>
      <div className={c.formWrapper}>
        <h3>Check Email</h3>
        <MarkEmailReadIcon color={"primary"} sx={{ fontSize: "100px" }} />
        <div className={c.description}>
          We’ve sent an Email with instructions to example@mail.com //TODO
        </div>
        <div className={c.actions}>
          <SuperButton name={"Back to login"} redirectPath={RouteNames.LOGIN} />
        </div>
      </div>
    </div>
  );
};
