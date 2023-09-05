import React from "react";

// ui
import { CustomSelect } from "components/ui";
// icons
import { getPriorityIcon } from "components/icons/priority-icon";
// constants
import { PRIORITIES } from "constants/project";

type Props = {
  value: string | null;
  onChange: (value: string) => void;
};

export const IssuePrioritySelect: React.FC<Props> = ({ value, onChange }) => (
  <CustomSelect
    value={value}
    label={
      <div className="flex items-center justify-center gap-2 text-xs">
        <span className="flex items-center">
          {getPriorityIcon(value, `text-xs ${value ? "" : "text-custom-text-200"}`)}
        </span>
        <span className={`${value ? "" : "text-custom-text-200"} capitalize`}>
          {value ?? "优先级"}
        </span>
      </div>
    }
    onChange={onChange}
    noChevron
  >
    {PRIORITIES.map((priority) => (
      <CustomSelect.Option key={priority} value={priority}>
        <div className="flex w-full justify-between gap-2 rounded">
          <div className="flex items-center justify-start gap-2">
            <span>{getPriorityIcon(priority)}</span>
            <span className="capitalize">

                {/*{priority === "urgent" && <span>急</span>}*/}
                {/*{priority === "high" && <span>高</span>}*/}
                {/*{priority === "medium" && <span>中</span>}*/}
                {/*{priority === "low" && <span>低</span>}*/}
                {/*{priority === "None" && <span>无</span>}*/}

                {priority ?? "无"}

            </span>
          </div>
        </div>
      </CustomSelect.Option>
    ))}
  </CustomSelect>
);
