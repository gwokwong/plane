import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { mutate } from "swr";

// react-hook-form
import { Controller, useForm } from "react-hook-form";
// services
import workspaceService from "services/workspace.service";
// hooks
import useToast from "hooks/use-toast";
// ui
import { CustomSelect, Input, PrimaryButton } from "components/ui";
// types
import { ICurrentUserResponse, IWorkspace } from "types";
// fetch-keys
import { USER_WORKSPACES } from "constants/fetch-keys";
// constants
import { ORGANIZATION_SIZE } from "constants/workspace";

type Props = {
  onSubmit?: (res: IWorkspace) => Promise<void>;
  defaultValues: {
    name: string;
    slug: string;
    organization_size: string;
  };
  setDefaultValues: Dispatch<SetStateAction<any>>;
  user: ICurrentUserResponse | undefined;
  secondaryButton?: React.ReactNode;
  primaryButtonText?: {
    loading: string;
    default: string;
  };
};

const restrictedUrls = [
  "api",
  "installations",
  "404",
  "create-workspace",
  "error",
  "invitations",
  "magic-sign-in",
  "onboarding",
  "profile",
  "reset-password",
  "sign-up",
  "spaces",
  "workspace-member-invitation",
];

export const CreateWorkspaceForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  setDefaultValues,
  user,
  secondaryButton,
  primaryButtonText = {
    loading: "创建中...",
    default: "创建工作区",
  },
}) => {
  const [slugError, setSlugError] = useState(false);
  const [invalidSlug, setInvalidSlug] = useState(false);

  const { setToastAlert } = useToast();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IWorkspace>({ defaultValues, mode: "onChange" });

  const handleCreateWorkspace = async (formData: IWorkspace) => {
    await workspaceService
      .workspaceSlugCheck(formData.slug)
      .then(async (res) => {
        if (res.status === true && !restrictedUrls.includes(formData.slug)) {
          setSlugError(false);

          await workspaceService
            .createWorkspace(formData, user)
            .then(async (res) => {
              setToastAlert({
                type: "success",
                title: "成功!",
                message: "工作区创建成功。",
              });

              mutate<IWorkspace[]>(
                USER_WORKSPACES,
                (prevData) => [res, ...(prevData ?? [])],
                false
              );
              if (onSubmit) await onSubmit(res);
            })
            .catch(() =>
              setToastAlert({
                type: "error",
                title: "错误!",
                message: "无法创建工作区。请重试。",
              })
            );
        } else setSlugError(true);
      })
      .catch(() => {
        setToastAlert({
          type: "error",
          title: "错误!",
          message: "创建工作区时发生一些错误。请重试。",
        });
      });
  };

  useEffect(
    () => () => {
      // when the component unmounts set the default values to whatever user typed in
      setDefaultValues(getValues());
    },
    [getValues, setDefaultValues]
  );

  return (
    <form className="space-y-6 sm:space-y-9" onSubmit={handleSubmit(handleCreateWorkspace)}>
      <div className="space-y-6 sm:space-y-7">
        <div className="space-y-1 text-sm">
          <label htmlFor="workspaceName">工作空间名称</label>
          <Input
            id="workspaceName"
            name="name"
            register={register}
            autoComplete="off"
            onChange={(e) =>
              setValue("slug", e.target.value.toLocaleLowerCase().trim().replace(/ /g, "-"))
            }
            validations={{
              required: "工作区名称为必填项",
              validate: (value) =>
                /^[\w\s-]*$/.test(value) ||
                `名称只能包含 (" "), ( - ), ( _ ) 和字母数字字符。`,
              maxLength: {
                value: 80,
                message: "工作区名称不应超过 80 个字符",
              },
            }}
            placeholder="输入工作区名称..."
            error={errors.name}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="workspaceUrl">工作区网址</label>
          <div className="flex w-full items-center rounded-md border border-custom-border-200 px-3">
            <span className="whitespace-nowrap text-sm text-custom-text-200">
              {window && window.location.host}/
            </span>
            <Input
              id="workspaceUrl"
              mode="trueTransparent"
              autoComplete="off"
              name="slug"
              register={register}
              className="block w-full rounded-md bg-transparent py-2 !px-0 text-sm"
              validations={{
                required: "工作区网址是必需的",
              }}
              onChange={(e) =>
                /^[a-zA-Z0-9_-]+$/.test(e.target.value)
                  ? setInvalidSlug(false)
                  : setInvalidSlug(true)
              }
            />
          </div>
          {slugError && (
            <span className="-mt-3 text-sm text-red-500">工作区网址已被占用！</span>
          )}
          {invalidSlug && (
            <span className="text-sm text-red-500">{`URL只能包含( - ), ( _ )和字母数字字符`}</span>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <span>你的组织规模有多大？</span>
          <div className="w-full">
            <Controller
              name="organization_size"
              control={control}
              rules={{ required: "此字段为必填项" }}
              render={({ field: { value, onChange } }) => (
                <CustomSelect
                  value={value}
                  onChange={onChange}
                  label={
                    ORGANIZATION_SIZE.find((c) => c === value) ?? (
                      <span className="text-custom-text-200">选择组织规模</span>
                    )
                  }
                  input
                  width="w-full"
                >
                  {ORGANIZATION_SIZE.map((item) => (
                    <CustomSelect.Option key={item} value={item}>
                      {item}
                    </CustomSelect.Option>
                  ))}
                </CustomSelect>
              )}
            />
            {errors.organization_size && (
              <span className="text-sm text-red-500">{errors.organization_size.message}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {secondaryButton}
        <PrimaryButton type="submit" size="md" disabled={!isValid} loading={isSubmitting}>
          {isSubmitting ? primaryButtonText.loading : primaryButtonText.default}
        </PrimaryButton>
      </div>
    </form>
  );
};
