import React from "react";
import s from "test_examples/base.module.css";

export const BaseComponent = () => {
  return (
    <div className={s.featureBlock} id="feature">
      <div className={`container ${s.featureContainer}`}>
        <div className={s.feature}></div>
      </div>
    </div>
  );
};
