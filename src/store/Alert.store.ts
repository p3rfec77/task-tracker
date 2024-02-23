import { create } from "zustand";

export interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

export const useAlert = create<AlertState>()((set) => ({
  open: false,
  message: "",
  severity: undefined,
  showAlert: (
    message: string,
    severity: "success" | "info" | "warning" | "error" | undefined
  ) =>
    set(() => {
      return { open: true, message, severity };
    }),
  closeAlert: () =>
    set(() => {
      return { open: false, message: "", severity: undefined };
    }),
}));
