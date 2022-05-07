import { FC } from "react";

export const Sidebar: FC = ({ children }) => {
  return (
    <aside
      className="bg-dark text-light h-100 internal-margin"
      style={{ padding: "4%" }}
    >
      {children}
    </aside>
  );
};
