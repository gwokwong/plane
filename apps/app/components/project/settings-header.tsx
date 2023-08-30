import SettingsNavbar from "layouts/settings-navbar";

export const SettingsHeader = () => (
  <div className="mb-8 space-y-6">
    <div>
      <h3 className="text-2xl font-semibold">项目设置</h3>
      <p className="mt-1 text-sm text-custom-text-200">
        这些信息将显示给项目的每个成员
      </p>
    </div>
    <SettingsNavbar />
  </div>
);
