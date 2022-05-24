import { useRouter } from "next/router";

const SideBanner = ({
  page,
  setPage,
  initialTitle,
  initialDesc,
  initialBtn,
}) => {
  const Router = useRouter();

  let titleLeft = initialTitle;
  let descLeft = initialDesc;
  let buttonLabelLeft = initialBtn;

  const titleRight = "New Here?";
  const descRight =
    "Enter your personal details and start your journey with us";
  const buttonLabelRight = "SIGN UP";

  if (page === "sign-up") {
    titleLeft = "One of us?";
    descLeft = "To keep connected with us please login with your personal info";
    buttonLabelLeft = "SIGN IN";
  } else if (page === "forgot-password") {
    titleLeft = "Made a mistake?";
    descLeft = "Enter your email so that we could send you instructions";
    buttonLabelLeft = "GO BACK";
  }

  const signUp = () => {
    setPage("sign-up");
    setTimeout(function () {
      Router.push("/auth/sign-up");
    }, 300);
  };

  const signIn = () => {
    setPage("sign-in");
    setTimeout(function () {
      Router.push("/auth/sign-in");
    }, 300);
  };

  return (
    <div className="auth-overlay-container">
      <div className="auth-overlay">
        <div className="auth-overlay-panel auth-overlay-left">
          <h1 className="auth-headings-alt">{titleLeft}</h1>
          <p className="auth-sub-headings-alt">{descLeft}</p>
          <button className="auth-btn ghost" onClick={signIn}>
            {buttonLabelLeft}
          </button>
        </div>
        <div className="auth-overlay-panel auth-overlay-right">
          <h1 className="auth-headings-alt">{titleRight}</h1>
          <p className="auth-sub-headings-alt">{descRight}</p>
          <button className="auth-btn ghost" onClick={signUp}>
            {buttonLabelRight}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBanner;
