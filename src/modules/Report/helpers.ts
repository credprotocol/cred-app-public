import * as _ from "lodash";

import { getTailwindColor } from "@/styles/theme";
import { ReportAddressResult, ReportAssetResult } from "@/types/api";

import { MetricConfig } from "./types";

export const generateMetricConfig = (configs: MetricConfig[]) => {
  return configs.map((config) => {
    const colorString = getTailwindColor(config.color);
    return {
      color: config.color,
      metricLabel: config.label,
      metricName: config.name,
      fillColor: colorString,
    };
  });
};

export const extractAddressAPIData = (data: ReportAddressResult) => {
  const { general_report, lending_report } = data.report;

  const total_asset_value_usd = _.get(
    general_report,
    "global_summary_stats.total_asset_amount_usd"
  );

  const total_asset_percentile = _.get(
    general_report,
    "global_percentiles.total_asset_amount_usd"
  );

  const total_deposit_percentile = _.get(
    lending_report,
    "global_percentiles.total_deposit_amount_usd"
  );

  const total_debt_percentile = _.get(
    lending_report,
    "global_percentiles.total_borrow_amount_usd"
  );

  const total_deposit_value_usd = _.get(
    lending_report,
    "global_summary_stats.total_deposit_amount_usd"
  );

  const total_debt_value_usd = _.get(
    lending_report,
    "global_summary_stats.total_borrow_amount_usd"
  );

  const total_collateral_percentile = _.get(
    lending_report,
    "global_percentiles.total_deposit_amount_usd"
  );

  const total_collateral_value_usd = _.get(
    lending_report,
    "global_summary_stats.total_deposit_amount_usd"
  );

  return [
    {
      metricName: "assets",
      value: parseInt(total_asset_value_usd),
      percentile: total_asset_percentile,
    },
    {
      metricName: "deposit",
      value: parseInt(total_deposit_value_usd),
      percentile: total_deposit_percentile,
    },
    {
      metricName: "collateral",
      value: parseInt(total_collateral_value_usd),
      percentile: total_collateral_percentile,
    },
    {
      metricName: "debt",
      value: parseInt(total_debt_value_usd),
      percentile: total_debt_percentile,
    },
  ];
};

export const extractAssetAPIData = (
  data: ReportAssetResult,
  metric: string
) => {
  const { erc20 } = data;

  return erc20.map((symbol) => ({
    name: symbol.symbol,
    value: isNaN(parseFloat(symbol[metric]))
      ? null
      : parseFloat(symbol[metric]),
    address: symbol.address,
  }));
};
