import { useState } from "react";
import { useRouter } from "next/router";
import { Auth } from "@aws-amplify/auth";
import { notification, Grid } from "antd";
import SignInContainer from "../components/SignInContainer";
import SideBanner from "../components/SideBanner";

import { switchPages } from ".";
const { useBreakpoint } = Grid;

const SignIn = () => {
  const screens = useBreakpoint();
  const router = useRouter();
  const { impersonateUser } = router.query;
  const [loaded, setLoaded] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("sign-in");
  const [code, setCode] = useState("");

  const handleRerouting = async () => {
    router.push("signed-in");
  };

  const validateMissing = () => {
    let missingFields = [];

    if (!email) {
      missingFields = [...missingFields, "Email"];
    }

    if (!password) {
      missingFields = [...missingFields, "Password"];
    }

    if (missingFields.length !== 0) {
      notification["warning"]({
        message: `Please Enter`,
        description: `${missingFields.join(", ")}`,
      });
      return true;
    }
    return false;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    let hasError = [];
    hasError = [...hasError, validateMissing()];

    if (!hasError.includes(true)) {
      setLoggingIn(true);
      Auth.signIn(email, password, {
        impersonateUser: impersonateUser,
      })
        .then((usr) => {
          notification["success"]({
            message: "Logged In.",
            description: `You have logged in successfully.`,
          });
          return handleRerouting(usr);
        })
        .catch((err) => {
          if (err.code === "UserNotConfirmedException") {
            notification["warning"]({
              message: `Account not verified.`,
              description: `${email} requires verification, please check your email.`,
            });
          } else if (err.code === "NotAuthorizedException") {
            notification["warning"]({
              message: `Login failed`,
              description: `${err.message}`,
            });
          } else {
            notification["error"]({
              message: `Failed to log in`,
              description: `${err.message}`,
            });
          }
        })
        .finally(() => {
          setLoggingIn(false);
        });
    }
  };

  return (
    <div className="auth-outer-container">
      <div className={switchPages(page)}>
        <SignInContainer
          handleLoginSubmit={handleLoginSubmit}
          loggingIn={loggingIn}
          setEmail={setEmail}
          setPassword={setPassword}
          setCode={setCode}
          screens={screens}
        />
        {!screens.xs ? <SideBanner page={page} setPage={setPage} /> : <></>}
      </div>
    </div>
  );
};

export default SignIn;
