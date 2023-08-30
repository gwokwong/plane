import React from "react";
// next

import { useRouter } from "next/router";
import useSWR from "swr";
import {
  CheckIcon,
  CubeIcon,
  ShareIcon,
  StarIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// swr
// services
import workspaceService from "services/workspace.service";
// hooks
import useUser from "hooks/use-user";
// layouts
import DefaultLayout from "layouts/default-layout";
// ui
import { Spinner } from "components/ui";
// icons
import { EmptySpace, EmptySpaceItem } from "components/ui/empty-space";
// types
import type { NextPage } from "next";
// constants
import { WORKSPACE_INVITATION } from "constants/fetch-keys";

const WorkspaceInvitation: NextPage = () => {
  const router = useRouter();

  const { invitation_id, email } = router.query;

  const { user } = useUser();

  const { data: invitationDetail, error } = useSWR(invitation_id && WORKSPACE_INVITATION, () =>
    invitation_id ? workspaceService.getWorkspaceInvitation(invitation_id as string) : null
  );

  const handleAccept = () => {
    if (!invitationDetail) return;
    workspaceService
      .joinWorkspace(
        invitationDetail.workspace.slug,
        invitationDetail.id,
        {
          accepted: true,
          email: invitationDetail.email,
        },
        user
      )
      .then(() => {
        if (email === user?.email) {
          router.push("/invitations");
        } else {
          router.push("/");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <DefaultLayout>
      <div className="flex h-full w-full flex-col items-center justify-center px-3">
        {invitationDetail ? (
          <>
            {error ? (
              <div className="flex w-full flex-col space-y-4 rounded border border-custom-border-200 bg-custom-background-100 px-4 py-8 text-center shadow-2xl md:w-1/3">
                <h2 className="text-xl uppercase">INVITATION NOT FOUND</h2>
              </div>
            ) : (
              <>
                {invitationDetail.accepted ? (
                  <>
                    <EmptySpace
                      title={`您已经是 ${invitationDetail.workspace.name}的成员`}
                      description="您的工作区是您在Mission plan 账户中创建项目、协作处理问题和组织不同工作流的地方。"
                    >
                      <EmptySpaceItem
                        Icon={CubeIcon}
                        title="继续到仪表板"
                        action={() => router.push("/")}
                      />
                    </EmptySpace>
                  </>
                ) : (
                  <EmptySpace
                    title={`您已受邀参加 ${invitationDetail.workspace.name}`}
                    description="您的工作区是您在Mission plan 账户中创建项目、协作处理问题和组织不同工作流的地方。"
                  >
                    <EmptySpaceItem Icon={CheckIcon} title="Accept" action={handleAccept} />
                    <EmptySpaceItem
                      Icon={XMarkIcon}
                      title="Ignore"
                      action={() => {
                        router.push("/");
                      }}
                    />
                  </EmptySpace>
                )}
              </>
            )}
          </>
        ) : error ? (
          <EmptySpace
            title="该邀请链接已失效"
            description="您的工作区是您在Mission plan 账户中创建项目、协作处理问题和组织不同工作流的地方。"
            link={{ text: "或从空白项目开始", href: "/" }}
          >
            {!user ? (
              <EmptySpaceItem
                Icon={UserIcon}
                title="登录以继续"
                action={() => {
                  router.push("/");
                }}
              />
            ) : (
              <EmptySpaceItem
                Icon={CubeIcon}
                title="继续到仪表板"
                action={() => {
                  router.push("/");
                }}
              />
            )}
            {/*<EmptySpaceItem*/}
            {/*  Icon={StarIcon}*/}
            {/*  title="Star us on GitHub"*/}
            {/*  action={() => {*/}
            {/*    router.push("https://github.com/makeplane");*/}
            {/*  }}*/}
            {/*/>*/}
            <EmptySpaceItem
              Icon={ShareIcon}
              title="Join our community of active creators"
              action={() => {
                router.push("https://discord.com/invite/8SR2N9PAcJ");
              }}
            />
          </EmptySpace>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default WorkspaceInvitation;
