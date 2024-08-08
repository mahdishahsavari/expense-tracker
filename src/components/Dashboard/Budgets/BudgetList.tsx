"use client";

import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

export type BudgetListItem = {
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
  totalSpend: number;
  totalItem: number;
};

function BudgetList() {
  const [budgetList, setBudgetList] = useState<BudgetListItem[] | undefined>();

  const { user } = useUser();

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  /**
   * used to get budget's list
   */
  const getBudgetList = async (): Promise<void> => {
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
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result as BudgetListItem[]);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length! > 0
          ? budgetList?.map((budget, index) => <BudgetItem budget={budget} />)
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200/50 dark:bg-muted rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
