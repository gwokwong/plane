// services images
import GithubLogo from "public/services/github.png";
import JiraLogo from "public/services/jira.png";
import CSVLogo from "public/services/csv.svg";
import ExcelLogo from "public/services/excel.svg";
import JSONLogo from "public/services/json.svg";
import { TStaticViewTypes } from "types";

export const ROLE = {
  5: "Guest",
  10: "Viewer",
  15: "Member",
  20: "Admin",
};

export const ORGANIZATION_SIZE = ["只有我自己", "2-10", "11-50", "51-200", "201-500", "500+"];

export const USER_ROLES = [
  { value: "Product / Project Manager", label: "产品经理/项目经理" },
  { value: "Development / Engineering", label: "开发者/工程师" },
  { value: "Founder / Executive", label: "创始人/执行官" },
  { value: "Freelancer / Consultant", label: "自由职业者/顾问" },
  { value: "Marketing / Growth", label: "市场营销" },
  { value: "Sales / Business Development", label: "销售/业务开发" },
  { value: "Support / Operations", label: "支持/运营" },
  { value: "Student / Professor", label: "学生/教授" },
  { value: "Human Resources", label: "人力资源" },
  { value: "Other", label: "其他" },
];

export const IMPORTERS_EXPORTERS_LIST = [
  {
    provider: "github",
    type: "import",
    title: "GitHub",
    description: "Import issues from GitHub repositories and sync them.",
    logo: GithubLogo,
  },
  {
    provider: "jira",
    type: "import",
    title: "Jira",
    description: "Import issues and epics from Jira projects and epics.",
    logo: JiraLogo,
  },
];

export const EXPORTERS_LIST = [
  {
    provider: "csv",
    type: "export",
    title: "CSV",
    description: "Export issues to a CSV file.",
    logo: CSVLogo,
  },
  {
    provider: "xlsx",
    type: "export",
    title: "Excel",
    description: "Export issues to a Excel file.",
    logo: ExcelLogo,
  },
  {
    provider: "json",
    type: "export",
    title: "JSON",
    description: "Export issues to a JSON file.",
    logo: JSONLogo,
  },
];

export const DEFAULT_GLOBAL_VIEWS_LIST: {
  key: TStaticViewTypes;
  label: string;
}[] = [
  {
    key: "all-issues",
    label: "All issues",
  },
  {
    key: "assigned",
    label: "Assigned",
  },
  {
    key: "created",
    label: "Created",
  },
  {
    key: "subscribed",
    label: "Subscribed",
  },
];

export const RESTRICTED_URLS = [
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
