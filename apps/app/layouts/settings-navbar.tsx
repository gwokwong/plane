import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  profilePage?: boolean;
};

const SettingsNavbar: React.FC<Props> = ({ profilePage = false }) => {
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;

  const workspaceLinks: Array<{
    label: string;
    href: string;
  }> = [
    {
      label: "通用",
      href: `/${workspaceSlug}/settings`,
    },
    {
      label: "成员",
      href: `/${workspaceSlug}/settings/members`,
    },
    // {
    //   label: "Billing & Plans",
    //   href: `/${workspaceSlug}/settings/billing`,
    // },
    // {
    //   label: "Integrations",
    //   href: `/${workspaceSlug}/settings/integrations`,
    // },
    // {
    //   label: "Imports",
    //   href: `/${workspaceSlug}/settings/imports`,
    // },
    // {
    //   label: "Exports",
    //   href: `/${workspaceSlug}/settings/exports`,
    // },
  ];

  const projectLinks: Array<{
    label: string;
    href: string;
  }> = [
    {
      label: "通用",
      href: `/${workspaceSlug}/projects/${projectId}/settings`,
    },
    {
      label: "控制",
      href: `/${workspaceSlug}/projects/${projectId}/settings/control`,
    },
    {
      label: "成员",
      href: `/${workspaceSlug}/projects/${projectId}/settings/members`,
    },
    // {
    //   label: "功能",
    //   href: `/${workspaceSlug}/projects/${projectId}/settings/features`,
    // },
    {
      label: "状态",
      href: `/${workspaceSlug}/projects/${projectId}/settings/states`,
    },
    {
      label: "标签",
      href: `/${workspaceSlug}/projects/${projectId}/settings/labels`,
    },
    // {
    //   label: "Integrations",
    //   href: `/${workspaceSlug}/projects/${projectId}/settings/integrations`,
    // },
    // {
    //   label: "Estimates",
    //   href: `/${workspaceSlug}/projects/${projectId}/settings/estimates`,
    // },
    {
      label: "自动化",
      href: `/${workspaceSlug}/projects/${projectId}/settings/automations`,
    },
  ];

  const profileLinks: Array<{
    label: string;
    href: string;
  }> = [
    {
      label: "通用",
      href: `/${workspaceSlug}/me/profile`,
    },
    {
      label: "活动",
      href: `/${workspaceSlug}/me/profile/activity`,
    },
    {
      label: "偏好",
      href: `/${workspaceSlug}/me/profile/preferences`,
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {(profilePage ? profileLinks : projectId ? projectLinks : workspaceLinks).map((link) => (
        <Link key={link.href} href={link.href}>
          <a>
            <div
              className={`rounded-full border px-5 py-1.5 text-sm outline-none ${
                (
                  link.label === "Import"
                    ? router.asPath.includes(link.href)
                    : router.asPath === link.href
                )
                  ? "border-custom-primary bg-custom-primary text-white"
                  : "border-custom-border-200 bg-custom-background-100 hover:bg-custom-background-90"
              }`}
            >
              {link.label}
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SettingsNavbar;
