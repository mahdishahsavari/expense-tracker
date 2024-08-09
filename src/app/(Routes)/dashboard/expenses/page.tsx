"use client";

import React, { useEffect, useState } from "react";
import LetterPullup from "@/components/Dashboard/Budgets/LetterPullup";
import ExpenseListTable from "@/components/Dashboard/Expenses/ExpenseListTable";
import { Cover } from "@/components/ui/cover";
import { ExpensesListProps } from "./[id]/page";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { desc } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";

function page() {
  const [expensesList, setExpensesList] = useState<ExpensesListProps[]>([]);

  const { user } = useUser();
  useEffect(() => {
    if (user) {
      getExpensesList();
    }
  }, [user]);

  const getExpensesList = async () => {
    const result = await db.select().from(Expenses).orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  return (
    <div>
      <LetterPullup words="My Expenses" />
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

export default page;
