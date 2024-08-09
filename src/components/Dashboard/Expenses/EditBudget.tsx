"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { PenBox } from "lucide-react";
import LetterPullup from "../Budgets/LetterPullup";
import SlightFlip from "../Budgets/FlipText";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function EditBudget({
  budgetInfo,
  refreshData,
}: {
  budgetInfo: any;
  refreshData: any;
}) {
  const [emojiIcon, setEmojiIcon] = useState<string | null>(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [amount, setAmount] = useState<string>();

  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setName(budgetInfo?.name);
      setAmount(budgetInfo?.amount);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast("Budget Updated Successfully!");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2 dark:bg-lime-600 dark:text-white">
            <PenBox className="h-4 w-4" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <LetterPullup words="Edit Your Budget" delay={0.08} />
            </DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  className="text-lg"
                >
                  {emojiIcon}
                </Button>
                <div className="relative">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji), setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <div className="mt-2">
                    <h2>
                      <SlightFlip
                        word="Budget Name"
                        className="text-sm font-medium tracking-[-0.1em] text-black dark:text-white md:text-base mb-2"
                      />
                    </h2>
                    <Input
                      defaultValue={budgetInfo?.name}
                      placeholder="e.g. Home Decor"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <h2>
                      <SlightFlip
                        word="Budget Amount"
                        className="text-sm font-medium tracking-[-0.1em] text-black dark:text-white md:text-base mb-2"
                      />
                    </h2>
                    <Input
                      defaultValue={budgetInfo?.amount}
                      type="number"
                      placeholder="e.g. $5000"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onUpdateBudget()}
                className="cursor-pointer mt-5 group relative inline-flex items-center overflow-hidden rounded-2xl bg-primary px-8 py-3 text-white focus:outline-none focus:ring active:bg-primary"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                  {" "}
                  Update Budget{" "}
                </span>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
