import { ExpensesListProps } from "@/app/(Routes)/dashboard/expenses/[id]/page";
import GradualSpacing from "@/components/ui/GradualSpacing";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ExpenseListTable({
  expensesList,
  refreshData,
}: {
  expensesList: ExpensesListProps[];
  refreshData: any;
}) {
  const deleteExpense = async (expense: any) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast("Expense Deleted Successfully!");
      refreshData();
    }
  };

  return (
    <div className="mt-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">
              <GradualSpacing
                className="font-display text-center text-base font-bold tracking-[-0.1em]  text-black dark:text-white md:text-sm md:leading-[5rem]"
                text="Name"
              />
            </TableHead>
            <TableHead className="text-center">
              <GradualSpacing
                className="font-display text-center text-base font-bold tracking-[-0.1em]  text-black dark:text-white md:text-sm md:leading-[5rem]"
                text="Amount"
              />
            </TableHead>
            <TableHead className="text-center">
              <GradualSpacing
                className="font-display text-center text-base font-bold tracking-[-0.1em]  text-black dark:text-white md:text-sm md:leading-[5rem]"
                text="Date"
              />
            </TableHead>
            <TableHead className="text-center">
              <GradualSpacing
                className="font-display text-center text-base font-bold tracking-[-0.1em]  text-black dark:text-white md:text-sm md:leading-[5rem]"
                text="Actions"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expensesList.map((expenses, index) => (
            <TableRow>
              <TableCell className="font-medium text-center">
                {expenses.name}
              </TableCell>
              <TableCell className="font-medium text-center">
                {expenses.amount}
              </TableCell>
              <TableCell className="font-medium text-center">
                {expenses.createdAt}
              </TableCell>
              <TableCell className="font-medium flex items-center justify-center ">
                <Trash2
                  className="text-rose-600 dark:text-rose-900 cursor-pointer"
                  onClick={() => deleteExpense(expenses)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ExpenseListTable;
