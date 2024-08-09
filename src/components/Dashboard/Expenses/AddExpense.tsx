"use client";

import React, { useState } from "react";
import LetterPullup from "../Budgets/LetterPullup";
import SlightFlip from "../Budgets/FlipText";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { toast } from "sonner";
import moment from "moment";
import { Loader } from "lucide-react";

function AddExpense({
  budgetId,
  refreshData,
}: {
  budgetId: string;
  refreshData: any;
}) {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * use to add new expense
   */
  const addNewExpense = async () => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: Budgets.id });

    setAmount("");
    setName("");
    if (result) {
      setLoading(false);
      refreshData();
      toast("New Expense Added!");
    }
    setLoading(false);
  };

  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">
        <LetterPullup words="Add Expense" />
      </h2>
      <div className="mt-2">
        <h2>
          <SlightFlip
            word="Expense Name"
            className="text-sm font-medium tracking-[-0.1em] text-black dark:text-white md:text-base mb-2"
          />
        </h2>
        <Input
          value={name}
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2>
          <SlightFlip
            word="Expense Amount"
            className="text-sm font-medium tracking-[-0.1em] text-black dark:text-white md:text-base mb-2"
          />
        </h2>
        <Input
          value={amount}
          placeholder="e.g. 1,000"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button
        onClick={() => addNewExpense()}
        disabled={!(name && amount) || loading}
        className="mt-5 text-white font-medium rounded-xl transition-all hover:scale-105 dark:bg-emerald-600 shadow-md w-full hover:z-20"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
