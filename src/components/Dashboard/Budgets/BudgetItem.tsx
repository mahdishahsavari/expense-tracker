import React, { useEffect, useState } from "react";
import { BudgetListItem } from "./BudgetList";
import SlightFlip from "./FlipText";
import Link from "next/link";

function BudgetItem({ budget }: { budget: BudgetListItem }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / Number(budget.amount)) * 100;
    return perc.toFixed(2);
  };

  return (
    <Link
      href={`/dashboard/expenses/${budget?.id}`}
      className="p-5 h-[170px] border rounded-lg hover:scale-105 transition-all hover:shadow-lg hover:z-10 cursor-pointer"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className={`bg-lime-200 text-2xl p-2 rounded-full`}>
            {budget?.icon}
          </h2>
          <div className="">
            <h2 className="font-bold">{budget?.name}</h2>
            <h2 className="font-semibold text-sm text-muted-foreground">
              {budget?.totalItem} Item
            </h2>
          </div>
        </div>
        <h2 className="font-bold text-primary dark:text-emerald-500 text-lg">
          ${budget?.amount}
        </h2>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="flex gap-2 text-xs text-muted-foreground">
            ${budget?.totalSpend ? budget?.totalSpend : 0}{" "}
            <SlightFlip
              word="Spend"
              className="text-xs text-muted-foreground "
            />
          </h2>
          <h2 className="flex gap-2 text-xs text-muted-foreground">
            ${Number(budget?.amount) - budget?.totalSpend}{" "}
            <SlightFlip
              word="Remained"
              className="text-xs text-muted-foreground"
            />
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-primary dark:bg-emerald-600 h-2 rounded-full"
            style={{ width: `${calculateProgressPerc()}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
