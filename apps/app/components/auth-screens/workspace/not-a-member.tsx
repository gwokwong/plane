import Link from "next/link";

// layouts
import DefaultLayout from "layouts/default-layout";
// ui
import { PrimaryButton, SecondaryButton } from "components/ui";

export const NotAWorkspaceMember = () => (
  <DefaultLayout>
    <div className="grid h-full place-items-center p-4">
      <div className="space-y-8 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">未授权！</h3>
          <p className="mx-auto w-1/2 text-sm text-custom-text-200">
            您不是此工作区的成员。请联系工作区管理员获取邀请或查看您的待发邀请。
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link href="/invitations">
            <a>
              <SecondaryButton>检查待处理的邀请</SecondaryButton>
            </a>
          </Link>
          <Link href="/create-workspace">
            <a>
              <PrimaryButton>创建新工作区</PrimaryButton>
            </a>
          </Link>
        </div>
      </div>
    </div>
  </DefaultLayout>
);
