import { FC } from "react";

export const Sidebar: FC = ({ children }) => {
  return (
    <aside
      className="bg-dark text-light h-100 w-12 internal-margin"
      style={{ padding: "10px" }}
    >
      {children}
    </aside>
  );
};
