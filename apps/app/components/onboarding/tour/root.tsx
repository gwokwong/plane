import { useState } from "react";

import Image from "next/image";

// hooks
import useUser from "hooks/use-user";
// components
import { TourSidebar } from "components/onboarding";
// ui
import { PrimaryButton, SecondaryButton } from "components/ui";
// icons
import { XMarkIcon } from "@heroicons/react/24/outline";
// images
import PlaneWhiteLogo from "public/plane-logos/white-horizontal.svg";
import IssuesTour from "public/onboarding/issues.webp";
import CyclesTour from "public/onboarding/cycles.webp";
import ModulesTour from "public/onboarding/modules.webp";
import ViewsTour from "public/onboarding/views.webp";
import PagesTour from "public/onboarding/pages.webp";

type Props = {
  onComplete: () => void;
};

export type TTourSteps = "welcome" | "issues" | "cycles" | "modules" | "views" | "pages";

const TOUR_STEPS: {
  key: TTourSteps;
  title: string;
  description: string;
  image: any;
  prevStep?: TTourSteps;
  nextStep?: TTourSteps;
}[] = [
  {
    key: "issues",
    title: "任务",
    description:
      "任务是MissionPlan的基石。MissionPlan中的大多数概念都与任务及其属性有关。",
    image: IssuesTour,
    nextStep: "cycles",
  },
  {
    key: "cycles",
    title: "移至周期",
    description:
      "周期可以帮助您和您的团队加快进度，类似于敏捷开发中常用的冲刺阶段。",
    image: CyclesTour,
    prevStep: "issues",
    nextStep: "modules",
  },
  {
    key: "modules",
    title: "分解成模块",
    description:
      "模块可将您的重要工作分解为项目或功能，帮助您更好地组织工作。",
    image: ModulesTour,
    prevStep: "cycles",
    nextStep: "views",
  },
  {
    key: "views",
    title: "视图",
    description:
      "创建自定义筛选器，只显示与您相关的问题。只需点击几下，即可保存并共享您的筛选器。",
    image: ViewsTour,
    prevStep: "modules",
    nextStep: "pages",
  },
  {
    key: "pages",
    title: "pages文档",
    description: "在开会或开始一天的工作时，用Pages快速记下问题。",
    image: PagesTour,
    prevStep: "views",
  },
];

export const TourRoot: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<TTourSteps>("welcome");

  const { user } = useUser();

  const currentStepIndex = TOUR_STEPS.findIndex((tourStep) => tourStep.key === step);
  const currentStep = TOUR_STEPS[currentStepIndex];

  return (
    <>
      {step === "welcome" ? (
        <div className="w-4/5 md:w-1/2 lg:w-2/5 h-3/4 bg-custom-background-100 rounded-[10px] overflow-hidden">
          <div className="h-full overflow-hidden">
            <div className="h-3/5 bg-custom-primary-100 grid place-items-center">
              <Image src={PlaneWhiteLogo} alt="Plane White Logo" />
            </div>
            <div className="h-2/5 overflow-y-auto p-6">
              <h3 className="font-semibold sm:text-xl">
                欢迎来到MissionPlan, {user?.first_name} {user?.last_name}
              </h3>
              <p className="text-custom-text-200 text-sm mt-3">
                我们很高兴您决定试用MissionPlan。现在您可以轻松管理您的项目了。创建项目，开始使用。
              </p>
              <div className="flex items-center gap-6 mt-8">
                <PrimaryButton onClick={() => setStep("issues")}>了解产品</PrimaryButton>
                <button
                  type="button"
                  className="outline-custom-text-100 bg-transparent text-custom-primary-100 text-xs font-medium"
                  onClick={onComplete}
                >
                  不用了，谢谢，我自己会去探索
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-4/5 md:w-1/2 lg:w-3/5 h-3/5 sm:h-3/4 bg-custom-background-100 rounded-[10px] grid grid-cols-10 overflow-hidden">
          <button
            type="button"
            className="fixed top-[19%] sm:top-[11.5%] right-[9%] md:right-[24%] lg:right-[19%] border border-custom-text-100 rounded-full p-1 translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
            onClick={onComplete}
          >
            <XMarkIcon className="h-3 w-3 text-custom-text-100" />
          </button>
          <TourSidebar step={step} setStep={setStep} />
          <div className="col-span-10 lg:col-span-7 h-full overflow-hidden">
            <div
              className={`flex items-end h-1/2 sm:h-3/5 overflow-hidden bg-custom-primary-100 ${
                currentStepIndex % 2 === 0 ? "justify-end" : "justify-start"
              }`}
            >
              <Image src={currentStep?.image} alt={currentStep?.title} />
            </div>
            <div className="flex flex-col h-1/2 sm:h-2/5 p-4 overflow-y-auto">
              <h3 className="font-semibold sm:text-xl">{currentStep?.title}</h3>
              <p className="text-custom-text-200 text-sm mt-3">{currentStep?.description}</p>
              <div className="h-full flex items-end justify-between gap-4 mt-3">
                <div className="flex items-center gap-4">
                  {currentStep?.prevStep && (
                    <SecondaryButton onClick={() => setStep(currentStep.prevStep ?? "welcome")}>
                      后退
                    </SecondaryButton>
                  )}
                  {currentStep?.nextStep && (
                    <PrimaryButton onClick={() => setStep(currentStep.nextStep ?? "issues")}>
                      下一步
                    </PrimaryButton>
                  )}
                </div>
                {TOUR_STEPS.findIndex((tourStep) => tourStep.key === step) ===
                  TOUR_STEPS.length - 1 && (
                  <PrimaryButton onClick={onComplete}>创建我的第一个项目</PrimaryButton>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
