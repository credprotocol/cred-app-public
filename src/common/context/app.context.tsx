import { createContext } from "react";

export const AppContext = createContext({
  modalId: "",
  auth: {
    accessToken: "",
    expiredAt: null,
  },
  isMounted: false,
  setAuthToken: (token: string) => {},
  openModal: (id: string) => {},
  closeModal: (id: string) => {},
});
