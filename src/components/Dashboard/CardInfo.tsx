import React, { useEffect, useState } from "react";
import { BudgetListItem } from "./Budgets/BudgetList";
import { CardSpotlight } from "../ui/card-spotlight";
import { PiggyBank, ReceiptText, Wallet2 } from "lucide-react";

function CardInfo({
  budgetList,
}: {
  budgetList: BudgetListItem[] | undefined;
}) {
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [totalSpend, setTotalSpend] = useState<number>(0);

  useEffect(() => {
    budgetList && CalculateCardInfo();
  }, [budgetList]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList?.forEach((e) => {
      totalBudget_ = totalBudget_ + Number(e.amount);
      totalSpend_ = totalSpend_ + e.totalSpend;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <CardSpotlight className="h-48 w-full">
        <p className="text-xl font-bold relative z-20 mt-2 text-white text-center">
          Total Budget
        </p>
        <div className="flex items-center justify-between text-neutral-200 text-2xl font-bold mt-4 relative z-20">
          ${totalBudget}
          <PiggyBank className="bg-violet-600 p-3 h-12 w-12 rounded-full text-white" />
        </div>
      </CardSpotlight>
      <CardSpotlight className="h-48 w-full">
        <p className="text-xl font-bold relative z-20 mt-2 text-white text-center">
          Total Spent
        </p>
        <div className="flex items-center justify-between text-neutral-200 text-2xl font-bold mt-4 relative z-20">
          ${totalSpend}
          <ReceiptText className="bg-pink-600 p-3 h-12 w-12 rounded-full text-white" />
        </div>
      </CardSpotlight>
      <CardSpotlight className="h-48 w-full">
        <p className="text-xl font-bold relative z-20 mt-2 text-white text-center">
          No. Of Budgets
        </p>
        <div className="flex items-center justify-between text-neutral-200 text-2xl font-bold mt-4 relative z-20">
          {budgetList?.length}
          <Wallet2 className="bg-cyan-600 p-3 h-12 w-12 rounded-full text-white" />
        </div>
      </CardSpotlight>
    </div>
  );
}

export default CardInfo;
