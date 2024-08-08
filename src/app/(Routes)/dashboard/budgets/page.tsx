import React from "react";
import BudgetList from "@/components/Dashboard/Budgets/BudgetList";
import LetterPullup from "@/components/Dashboard/Budgets/LetterPullup";

function BudgetPage() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">
        <LetterPullup words="My Budgets" delay={0.05} />
      </h2>
      <BudgetList />
    </div>
  );
}

export default BudgetPage;
