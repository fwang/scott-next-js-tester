import { StackContext, NextjsSite, use } from "@serverless-stack/resources";
import { AuthStack } from "./AuthStack";
import { ApiStack } from "./ApiStack";

export function FrontendStack({ stack }: StackContext) {
  const { api } = use(ApiStack);
  const { userPool, userPoolClient, identityPool, domain } = use(AuthStack);

  const frontend = new NextjsSite(stack, "Site", {
    path: "frontend",
    environment: {
      NEXT_PUBLIC_STAGE: stack.stage,
      NEXT_PUBLIC_COGNITO_DOMAIN: domain.domainName,
      NEXT_PUBLIC_API_URL: api.url,
      NEXT_PUBLIC_REGION: stack.region,
      NEXT_PUBLIC_USER_POOL_ID: userPool.userPoolId,
      NEXT_PUBLIC_IDENTITY_POOL_ID: identityPool?.ref ?? "",
      NEXT_PUBLIC_USER_POOL_CLIENT_ID: userPoolClient.userPoolClientId,
    },
  });
  return { url: frontend.url };
}
