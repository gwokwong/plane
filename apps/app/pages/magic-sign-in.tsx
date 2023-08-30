import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

// next-themes
import { useTheme } from "next-themes";
// layouts
import DefaultLayout from "layouts/default-layout";
// services
import authenticationService from "services/authentication.service";
// hooks
import useUserAuth from "hooks/use-user-auth";
import useToast from "hooks/use-toast";
// types
import type { NextPage } from "next";

const MagicSignIn: NextPage = () => {
  const router = useRouter();
  const { password, key } = router.query;

  const { setToastAlert } = useToast();

  const { setTheme } = useTheme();

  const { mutateUser } = useUserAuth("sign-in");

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorSigningIn, setErrorSignIn] = useState<string | undefined>();

  useEffect(() => {
    setTheme("system");
  }, [setTheme]);

  useEffect(() => {
    setIsSigningIn(() => false);
    setErrorSignIn(() => undefined);
    if (!password || !key) {
      setErrorSignIn("URL is invalid");
      return;
    } else {
      setIsSigningIn(() => true);
      authenticationService
        .magicSignIn({ token: password, key })
        .then(async (res) => {
          setIsSigningIn(false);
          await mutateUser();
        })
        .catch((err) => {
          setErrorSignIn(err.response.data.error);
          setIsSigningIn(false);
        });
    }
  }, [password, key, mutateUser, router]);

  return (
    <DefaultLayout>
      <div className="h-screen w-full overflow-auto bg-custom-background-90">
        {isSigningIn ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <h2 className="text-4xl font-medium">Signing you in...</h2>
            <p className="text-sm font-medium text-custom-text-200">
              Please wait while we are preparing your take off.
            </p>
          </div>
        ) : errorSigningIn ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <h2 className="text-4xl font-medium">Error</h2>
            <div className="text-sm font-medium text-custom-text-200 flex gap-2">
              <div>{errorSigningIn}.</div>
              <span
                className="cursor-pointer underline"
                onClick={() => {
                  authenticationService
                    .emailCode({ email: (key as string).split("_")[1] })
                    .then(() => {
                      setToastAlert({
                        type: "success",
                        title: "发送电子邮件",
                        message: "新的链接/代码已发送给您",
                      });
                    })
                    .catch(() => {
                      setToastAlert({
                        type: "error",
                        title: "错误",
                        message: "无法发送电子邮件",
                      });
                    });
                }}
              >
                Send link again?
              </span>
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-2">
            <h2 className="text-4xl font-medium">Success</h2>
            <p className="text-sm font-medium text-custom-text-200">
              Redirecting you to the app...
            </p>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default MagicSignIn;
