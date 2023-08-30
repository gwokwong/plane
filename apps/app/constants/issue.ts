export const GROUP_BY_OPTIONS: Array<{
  name: string;
  key: TIssueGroupByOptions;
}> = [
  { name: "状态", key: "state" },
  { name: "状态组", key: "state_detail.group" },
  { name: "优先级", key: "priority" },
  { name: "Project", key: "project" },
  { name: "标签", key: "labels" },
  { name: "负责人", key: "assignees" },
  { name: "创建人", key: "created_by" },
  { name: "无", key: null },
];

export const ORDER_BY_OPTIONS: Array<{
  name: string;
  key: TIssueOrderByOptions;
}> = [
  { name: "手动", key: "sort_order" },
  { name: "最近创建", key: "-created_at" },
  { name: "最近更新", key: "-updated_at" },
  { name: "开始时间", key: "start_date" },
  { name: "优先级", key: "priority" },
];

export const FILTER_ISSUE_OPTIONS: Array<{
  name: string;
  key: "active" | "backlog" | null;
}> = [
  {
    name: "全部",
    key: null,
  },
  {
    name: "活动任务",
    key: "active",
  },
  {
    name: "积压任务",
    key: "backlog",
  },
];

import { orderArrayBy } from "helpers/array.helper";
import { IIssue, TIssueGroupByOptions, TIssueOrderByOptions } from "types";

type THandleIssuesMutation = (
  formData: Partial<IIssue>,
  oldGroupTitle: string,
  selectedGroupBy: TIssueGroupByOptions,
  issueIndex: number,
  orderBy: TIssueOrderByOptions,
  prevData?:
    | {
        [key: string]: IIssue[];
      }
    | IIssue[]
) =>
  | {
      [key: string]: IIssue[];
    }
  | IIssue[]
  | undefined;

export const handleIssuesMutation: THandleIssuesMutation = (
  formData,
  oldGroupTitle,
  selectedGroupBy,
  issueIndex,
  orderBy,
  prevData
) => {
  if (!prevData) return prevData;

  if (Array.isArray(prevData)) {
    const updatedIssue = {
      ...prevData[issueIndex],
      ...formData,
      assignees: formData?.assignees_list ?? prevData[issueIndex]?.assignees,
      labels: formData?.labels_list ?? prevData[issueIndex]?.labels,
    };

    prevData.splice(issueIndex, 1, updatedIssue);

    return [...prevData];
  } else {
    const oldGroup = prevData[oldGroupTitle ?? ""] ?? [];

    let newGroup: IIssue[] = [];

    if (selectedGroupBy === "priority") newGroup = prevData[formData.priority ?? ""] ?? [];
    else if (selectedGroupBy === "state") newGroup = prevData[formData.state ?? ""] ?? [];

    const updatedIssue = {
      ...oldGroup[issueIndex],
      ...formData,
      assignees: formData?.assignees_list ?? oldGroup[issueIndex]?.assignees,
      labels: formData?.labels_list ?? oldGroup[issueIndex]?.labels,
    };

    if (selectedGroupBy !== Object.keys(formData)[0])
      return {
        ...prevData,
        [oldGroupTitle ?? ""]: orderArrayBy(
          oldGroup.map((i) => (i.id === updatedIssue.id ? updatedIssue : i)),
          orderBy
        ),
      };

    const groupThatIsUpdated = selectedGroupBy === "priority" ? formData.priority : formData.state;

    return {
      ...prevData,
      [oldGroupTitle ?? ""]: orderArrayBy(
        oldGroup.filter((i) => i.id !== updatedIssue.id),
        orderBy
      ),
      [groupThatIsUpdated ?? ""]: orderArrayBy([...newGroup, updatedIssue], orderBy),
    };
  }
};
