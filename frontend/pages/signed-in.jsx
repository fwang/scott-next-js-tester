import { Card, Button, notification } from "antd";
import API from "@aws-amplify/api-rest";
import { useState } from "react";

const SignedIn = () => {
  const [loading, setLoading] = useState(false);
  const privateRoute = (e) => {
    setLoading(true);
    return API.get("api", "/private")
      .then((res) => {
        console.log(res);
        notification["success"]({
          message: "Successfully called api.",
          description: `${res}`,
        });
      })
      .catch((err) => {
        console.log(err);
        notification["error"]({
          message: "Failed to call api",
          description: `${err}`,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-outer-container">
      <Card>
        TEST PRIVATE ROUTE:
        <Button onClick={privateRoute} loading={loading}>
          CLICK ME
        </Button>
      </Card>
    </div>
  );
};

export default SignedIn;
