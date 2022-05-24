import { Duration } from "aws-cdk-lib";
import {
  AccountRecovery,
  Mfa,
  UserPool,
  UserPoolClient,
} from "aws-cdk-lib/aws-cognito";
// import ssm from '@aws-cdk/aws-ssm';

import { StackContext, Auth } from "@serverless-stack/resources";

export function AuthStack({ stack }: StackContext) {
  const userPool = new UserPool(stack, "Medii", {
    selfSignUpEnabled: true,
    signInAliases: { email: true },
    signInCaseSensitive: false,
    passwordPolicy: {
      minLength: 8,
      requireLowercase: true,
      requireDigits: true,
      requireUppercase: true,
      requireSymbols: false,
      tempPasswordValidity: Duration.days(7),
    },
    mfa: Mfa.OPTIONAL,
    mfaSecondFactor: {
      sms: true,
      otp: true,
    },
    accountRecovery: AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
    autoVerify: { email: true, phone: true },
  });
  const userPoolClient = new UserPoolClient(stack, "MediiClient", {
    userPool,
    authFlows: { userSrp: true },
  });
  const domain = userPool.addDomain("AuthDomain", {
    cognitoDomain: {
      domainPrefix: `${stack.stage}-medii-auth-domain`,
    },
  });

  const auth = new Auth(stack, "Auth", {
    cdk: {
      userPool: userPool,
      userPoolClient: userPoolClient,
    },
    triggers: {
      customMessage: {
        handler: "src/customMessage.main",
        timeout: 10,
        environment: {
          HOSTING_DOMAIN: "http://localhost:3000",
        },
      },
    },
  });
  const identityPool = auth.cdk.cfnIdentityPool;
  return { userPool, userPoolClient, identityPool, domain };
}
