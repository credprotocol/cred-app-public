import { AxiosError } from "axios";
import { createContext, Dispatch } from "react";

import { ReportAddressResult } from "@/types/api";

export type APIResultContextType = {
  reportAddress: {
    loading: boolean;
    data: ReportAddressResult;
    error: AxiosError;
  };
};
export const initialAPIContextData = {
  reportAddress: {
    loading: false,
    data: null,
    error: null,
  },
};

type ActionType = "LOADING_REPORT_ADDRESS" | "SET_REPORT_ADDRESS";

type Action = {
  type: ActionType;
  payload?: any;
};

export const apiReducer = (state: APIResultContextType, action: Action) => {
  switch (action.type) {
    case "LOADING_REPORT_ADDRESS": {
      return {
        ...state,
        reportAddress: {
          ...state.reportAddress,
          loading: true,
        },
      };
    }
    case "SET_REPORT_ADDRESS": {
      return {
        ...state,
        reportAddress: {
          ...(action.payload as {
            data: ReportAddressResult | null;
            error: AxiosError | null;
          }),
          loading: false,
        },
      };
    }
    default:
      return state;
  }
};

export const APIResultContext = createContext<APIResultContextType>({
  reportAddress: {
    loading: false,
    data: null,
    error: null,
  },
});

export const APIDispatchContext = createContext<Dispatch<Action>>(() => {});
