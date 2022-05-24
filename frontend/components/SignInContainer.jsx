import Link from "next/link";
// import styles from './styles/sign_in_container.module.scss';

const SignInContainer = ({
  handleLoginSubmit,
  loggingIn,
  setEmail,
  setPassword,
  screens,
}) => {
  return (
    <div className="auth-form-container auth-left-container">
      <div>
        <form onSubmit={handleLoginSubmit}>
          <input
            className="auth-input-forms"
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="auth-input-forms"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="auth-btn" type="submit" disabled={loggingIn}>
            {loggingIn ? "Loading..." : "SIGN IN"}
          </button>
          <br />
          {screens.xs ? (
            <Link href="/" passHref>
              <button className="auth-btn link" style={{ width: "145px" }}>
                SIGN UP
              </button>
            </Link>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInContainer;
