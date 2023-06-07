import s from "common/error-page/ErrorPage.module.css";
import error404 from "./404.svg";

export default function ErrorPage() {
  return (
    <div className={s.errorPage}>
      <img src={error404} alt={"404"} className={s.error404} />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}
