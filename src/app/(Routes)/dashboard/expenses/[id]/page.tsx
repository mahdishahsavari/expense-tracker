"use client";

import React, { useEffect, useState } from "react";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import LetterPullup from "@/components/Dashboard/Budgets/LetterPullup";
import BudgetItem from "@/components/Dashboard/Budgets/BudgetItem";
import { BudgetListItem } from "@/components/Dashboard/Budgets/BudgetList";
import AddExpense from "@/components/Dashboard/Expenses/AddExpense";
import ExpenseListTable from "@/components/Dashboard/Expenses/ExpenseListTable";
import { Cover } from "@/components/ui/cover";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EditBudget from "@/components/Dashboard/Expenses/EditBudget";

type ParamsProp = {
  id: string;
};

export type ExpensesListProps = {
  id: number;
  name: string;
  amount: string;
  budgetId: number | null;
  createdAt: string;
};

function ExpensesPage({ params }: { params: ParamsProp }) {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<BudgetListItem[]>();
  const [expensesList, setExpensesList] = useState<ExpensesListProps[]>([]);

  const router = useRouter();

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  /**
   * Get Budget Information
   */
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
    getExpensesList();
  };

  /**
   * Get  Latest Expenses
   */
  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  /**
   * used to remove budget
   */
  const deleteBudget = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();

    if (deleteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();

      if (result) {
        toast("Removed Successfully!");
        router.replace("/dashboard/budgets");
      }
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold flex items-center justify-between">
        <LetterPullup words="My Expenses" delay={0.05} />

        <div className="flex items-center gap-2">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="flex items-center justify-center gap-2"
              >
                <Trash2 /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
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
      <div className="mt-4">
        <h2 className="text-xl md:text-2xl text-center lg:text-3xl font-semibold max-w-7xl mx-auto mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          <Cover>Latest Expenses</Cover>
        </h2>
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getExpensesList()}
        />
      </div>
    </div>
  );
}

export default ExpensesPage;
