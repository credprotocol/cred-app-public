import {
  HistoryResult,
  RecommendResult,
  ReportAddressResult,
  ReportAssetResult,
} from "@/types/api";

export type MetricConfig = {
  name: string;
  color: string;
  label: string;
};
export type ReportAddressFetch = {
  data: ReportAddressResult;
  error: unknown;
  loading: boolean;
};
export type AssetAddressFetch = {
  data: ReportAssetResult;
  error: unknown;
  loading: boolean;
};

export type HistoryFetch = {
  data: HistoryResult;
  error: unknown;
  loading: boolean;
};

export type RecommendedFetch = {
  data: RecommendResult;
  error: unknown;
  loading: boolean;
};
