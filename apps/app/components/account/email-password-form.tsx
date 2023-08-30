import React, { useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

// react hook form
import { useForm } from "react-hook-form";
// components
import { EmailResetPasswordForm } from "components/account";
// ui
import { Input, PrimaryButton } from "components/ui";
// types
type EmailPasswordFormValues = {
  email: string;
  password?: string;
  medium?: string;
};

type Props = {
  onSubmit: (formData: EmailPasswordFormValues) => Promise<void>;
};

export const EmailPasswordForm: React.FC<Props> = ({ onSubmit }) => {
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const router = useRouter();
  const isSignUpPage = router.pathname === "/sign-up";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<EmailPasswordFormValues>({
    defaultValues: {
      email: "",
      password: "",
      medium: "email",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <>
      <h1 className="text-center text-2xl sm:text-2.5xl font-semibold text-custom-text-100">
        {isResettingPassword
          ? "重置密码"
          : isSignUpPage
          ? "注册MissionPlan"
          : "登录MissionPlan"}
      </h1>
      {isResettingPassword ? (
        <EmailResetPasswordForm setIsResettingPassword={setIsResettingPassword} />
      ) : (
        <form
          className="space-y-4 mt-10 w-full sm:w-[360px] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-1">
            <Input
              id="email"
              type="email"
              name="email"
              register={register}
              validations={{
                required: "电子邮件地址为必填项",
                validate: (value) =>
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value
                  ) || "电子邮件地址无效",
              }}
              error={errors.email}
              placeholder="输入您的电子邮件地址..."
              className="border-custom-border-300 h-[46px]"
            />
          </div>
          <div className="space-y-1">
            <Input
              id="password"
              type="password"
              name="password"
              register={register}
              validations={{
                required: "密码是必填项",
              }}
              error={errors.password}
              placeholder="输入您的密码..."
              className="border-custom-border-300 h-[46px]"
            />
          </div>
          <div className="text-right text-xs">
            {isSignUpPage ? (
              <Link href="/">
                <a className="text-custom-text-200 hover:text-custom-primary-100">
                  已有账号？去登录
                </a>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setIsResettingPassword(true)}
                className="text-custom-text-200 hover:text-custom-primary-100"
              >
                忘记密码?
              </button>
            )}
          </div>
          <div>
            <PrimaryButton
              type="submit"
              className="w-full text-center h-[46px]"
              disabled={!isValid && isDirty}
              loading={isSubmitting}
            >
              {isSignUpPage
                ? isSubmitting
                  ? "注册中..."
                  : "注册"
                : isSubmitting
                ? "登录中..."
                : "登录"}
            </PrimaryButton>
            {!isSignUpPage && (
              <Link href="/sign-up">
                <a className="block text-custom-text-200 hover:text-custom-primary-100 text-xs mt-4">
                  还没有账号？去注册
                </a>
              </Link>
            )}
          </div>
          <p className="text-custom-text-200 m-1 text-red-400 ">演示账号：captain@plane.so</p>
          <p className="text-custom-text-200 m-1 text-red-400"> 密码：password123</p>
        </form>
      )}
    </>
  );
};
