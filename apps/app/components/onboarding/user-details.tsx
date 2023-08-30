import { useEffect } from "react";

import { mutate } from "swr";

// react-hook-form
import { Controller, useForm } from "react-hook-form";
// hooks
import useToast from "hooks/use-toast";
// services
import userService from "services/user.service";
// ui
import { CustomSelect, Input, PrimaryButton } from "components/ui";
// types
import { ICurrentUserResponse, IUser } from "types";
// fetch-keys
import { CURRENT_USER } from "constants/fetch-keys";
// constants
import { USER_ROLES } from "constants/workspace";

const defaultValues: Partial<IUser> = {
  first_name: "",
  last_name: "",
  role: "",
};

type Props = {
  user?: IUser;
};

export const UserDetails: React.FC<Props> = ({ user }) => {
  const { setToastAlert } = useToast();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IUser>({
    defaultValues,
  });

  const onSubmit = async (formData: IUser) => {
    if (!user) return;

    const payload: Partial<IUser> = {
      ...formData,
      onboarding_step: {
        ...user.onboarding_step,
        profile_complete: true,
      },
    };

    await userService
      .updateUser(payload)
      .then(() => {
        mutate<ICurrentUserResponse>(
          CURRENT_USER,
          (prevData) => {
            if (!prevData) return prevData;

            return {
              ...prevData,
              ...payload,
            };
          },
          false
        );

        setToastAlert({
          type: "success",
          title: "成功!",
          message: "详细信息已成功更新",
        });
      })
      .catch((err) => {
        mutate(CURRENT_USER);
      });
  };

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      });
    }
  }, [user, reset]);

  return (
    <form
      className="h-full w-full space-y-7 sm:space-y-10 overflow-y-auto sm:flex sm:flex-col sm:items-start sm:justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative sm:text-lg">
        <div className="text-custom-primary-100 absolute -top-1 -left-3">{'"'}</div>
        <h5>嘿，您好 👋🏻</h5>
        <h5 className="mt-5 mb-6">让我们一起加入吧!</h5>
        <h4 className="text-xl sm:text-2xl font-semibold">设置您的个人资料</h4>
      </div>

      <div className="space-y-7 sm:w-3/4 md:w-2/5">
        <div className="space-y-1 text-sm">
          <label htmlFor="firstName">名字</label>
          <Input
            id="firstName"
            name="first_name"
            autoComplete="off"
            placeholder="输入您的名字..."
            register={register}
            validations={{
              required: "名字是必填项",
            }}
            error={errors.first_name}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="lastName">姓</label>
          <Input
            id="lastName"
            name="last_name"
            autoComplete="off"
            register={register}
            placeholder="输入您的姓..."
            validations={{
              required: "姓是必填项",
            }}
            error={errors.last_name}
          />
        </div>
        <div className="space-y-1 text-sm">
          <span>您的角色？</span>
          <div className="w-full">
            <Controller
              name="role"
              control={control}
              rules={{ required: "此栏为必填项" }}
              render={({ field: { value, onChange } }) => (
                <CustomSelect
                  value={value}
                  onChange={(val: any) => onChange(val)}
                  label={
                    value ? (
                      value.toString()
                    ) : (
                      <span className="text-custom-text-400">选择您的角色...</span>
                    )
                  }
                  input
                  width="w-full"
                  verticalPosition="top"
                >
                  {USER_ROLES.map((item) => (
                    <CustomSelect.Option key={item.value} value={item.value}>
                      {item.label}
                    </CustomSelect.Option>
                  ))}
                </CustomSelect>
              )}
            />
            {errors.role && <span className="text-sm text-red-500">{errors.role.message}</span>}
          </div>
        </div>
      </div>

      <PrimaryButton type="submit" size="md" disabled={!isValid} loading={isSubmitting}>
        {isSubmitting ? "更新..." : "继续"}
      </PrimaryButton>
    </form>
  );
};
