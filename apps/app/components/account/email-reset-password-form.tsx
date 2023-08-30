import React from "react";

// react hook form
import { useForm } from "react-hook-form";
// services
import userService from "services/user.service";
// hooks
import useToast from "hooks/use-toast";
// ui
import { Input, PrimaryButton, SecondaryButton } from "components/ui";
// types
type Props = {
  setIsResettingPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EmailResetPasswordForm: React.FC<Props> = ({ setIsResettingPassword }) => {
  const { setToastAlert } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const forgotPassword = async (formData: any) => {
    const payload = {
      email: formData.email,
    };

    await userService
      .forgotPassword(payload)
      .then(() =>
        setToastAlert({
          type: "success",
          title: "成功!",
          message: "密码重置链接已发送至您的电子邮件地址。",
        })
      )
      .catch((err) => {
        if (err.status === 400)
          setToastAlert({
            type: "error",
            title: "错误!",
            message: "请核对输入的电子邮件 ID。",
          });
        else
          setToastAlert({
            type: "error",
            title: "错误!",
            message: "出错了。请重试。",
          });
      });
  };

  return (
    <form
      className="space-y-4 mt-10 w-full sm:w-[360px] mx-auto"
      onSubmit={handleSubmit(forgotPassword)}
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
              ) || "Email address is not valid",
          }}
          error={errors.email}
          placeholder="请输入注册的电子邮件地址.."
          className="border-custom-border-300 h-[46px]"
        />
      </div>
      <div className="mt-5 flex flex-col-reverse sm:flex-row items-center gap-2">
        <SecondaryButton
          className="w-full text-center h-[46px]"
          onClick={() => setIsResettingPassword(false)}
        >
          Go Back
        </SecondaryButton>
        <PrimaryButton type="submit" className="w-full text-center h-[46px]" loading={isSubmitting}>
          {isSubmitting ? "发送链接..." : "发送重置链接"}
        </PrimaryButton>
      </div>
    </form>
  );
};
