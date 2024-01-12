import { compareAsc, parse } from "date-fns";

import { monthMapping } from "@/constant/reportData";
import { HistoryResultUSD } from "@/types/api";

export const parseNum = (num: string) => {
  return isNaN(parseFloat(num)) ? null : parseFloat(num);
};

type ChartData = {
  date: string;
  debt: number;
  deposit: number;
  collateral: number;
  asset: number;
};

export const generateHistoryData = (data: HistoryResultUSD) => {
  if (!data) {
    return null;
  }

  const isAllNull = data.every((entry) => entry.date === null);

  if (isAllNull) {
    return null;
  }
  const dataSortedByDate = data.sort((a, b) => {
    const dayA = parse(a.date, "yyyy-MM-dd", new Date());
    const dayB = parse(b.date, "yyyy-MM-dd", new Date());
    return compareAsc(dayA, dayB);
  });

  const currentMonth = new Date().getMonth(); // 0-11
  const currentYear = new Date().getFullYear();

  const dict = {};
  for (let i = 0; i < 6; i++) {
    const month =
      currentMonth - i < 0 ? currentMonth - i + 12 : currentMonth - i;
    const year = month < 0 ? currentYear - 1 : currentYear;
    const monthString = `${year}-${`0${month + 1}`.slice(-2)}`;
    dict[monthString] = {
      asset: null,
      collateral: null,
      date: monthMapping[monthString.slice(5)],
      debt: null,
      deposit: null,
    };
  }

  let monthDict: { [key: string]: ChartData } = dataSortedByDate.reduce(
    (dict, dayData) => {
      const month = dayData.date.slice(0, 7);
      if (dict[month]) {
        dict[month] = {
          asset: parseNum(dayData.asset_in_wallet_usd),
          deposit: parseNum(dayData.deposit_usd),
          collateral: parseNum(dayData.collateral_usd),
          debt: parseNum(dayData.debt_usd),
          date: monthMapping[month.slice(5)],
        };
      }
      return dict;
    },
    dict
  );
  const months = Object.keys(monthDict).sort((a, b) => {
    const monthA = parse(a, "yyyy-MM", new Date());
    const monthB = parse(b, "yyyy-MM", new Date());
    return compareAsc(monthA, monthB);
  });

  return months.map((month) => monthDict[month]);
};
