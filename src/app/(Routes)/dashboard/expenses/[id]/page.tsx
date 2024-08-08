"use client";

import React, { useEffect, useState } from "react";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import LetterPullup from "@/components/Dashboard/Budgets/LetterPullup";
import BudgetItem from "@/components/Dashboard/Budgets/BudgetItem";
import { BudgetListItem } from "@/components/Dashboard/Budgets/BudgetList";
import AddExpense from "@/components/Dashboard/Expenses/AddExpense";

type ParamsProp = {
  id: string;
};

function ExpensesPage({ params }: { params: ParamsProp }) {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<BudgetListItem[]>();

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async (): Promise<void> => {
    if (!user?.primaryEmailAddress?.emailAddress)
      throw new Error("User Not Found!");

    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress as string)
      )
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    setBudgetInfo(result[0] as BudgetListItem[]);
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold">
        <LetterPullup words="My Expenses" delay={0.05} />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="w-full bg-slate-200/50 dark:bg-muted rounded-lg h-[150px] animate-pulse"></div>
        )}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesPage;
