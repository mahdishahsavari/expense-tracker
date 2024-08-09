"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import LetterPullup from "@/components/Dashboard/Budgets/LetterPullup";
import SlightFlip from "@/components/Dashboard/Budgets/FlipText";
import CardInfo from "@/components/Dashboard/CardInfo";
import { BudgetListItem } from "@/components/Dashboard/Budgets/BudgetList";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import BarChartDashboard from "@/components/Dashboard/Budgets/BarChartDashboard";
import BudgetItem from "@/components/Dashboard/Budgets/BudgetItem";
import ExpenseListTable from "@/components/Dashboard/Expenses/ExpenseListTable";
import { Cover } from "@/components/ui/cover";

function DashboardPage() {
  const [budgetList, setBudgetList] = useState<BudgetListItem[] | undefined>();
  const [expensesList, setExpensesList] = useState([]);

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
    getAllExpenses();
  };

  /**
   * Used to get all user's expenses
   */
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress as string)
      )
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };

  return (
    <div className="p-8">
      <h2>
        <LetterPullup words={`Hi, ${user?.fullName}`} delay={0.05} />
      </h2>
      <SlightFlip word="Here's what happening with your Money" />
      <SlightFlip word="Lets manage your expense" />

      <CardInfo budgetList={budgetList} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
          <h2 className="text-xl md:text-2xl text-center lg:text-3xl font-semibold max-w-7xl mx-auto mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            <Cover>Latest Expenses</Cover>
          </h2>
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
        <div className="grid gap-5">
          <LetterPullup words="Latest Budgets" delay={0.05} />
          {budgetList?.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
