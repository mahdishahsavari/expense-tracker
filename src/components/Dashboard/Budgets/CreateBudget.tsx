"use client";

import React, { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
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
import LetterPullup from "./LetterPullup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SlightFlip from "./FlipText";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateBudget({ refreshData }: { refreshData: any }) {
  const [emojiIcon, setEmojiIcon] = useState<string | null>("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { user } = useUser();

  /**
   * create new budget function with drizzleORM
   */
  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        icon: emojiIcon,
        createdBy: user?.primaryEmailAddress?.emailAddress!,
      })
      .returning({
        insertedId: Budgets.id,
      });

    if (result) {
      refreshData();
      toast("New Budget Created Successfully 🥳");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-col items-center bg-muted p-10 rounded-md border-2 border-dashed cursor-pointer hover:shadow-md z-10">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <LetterPullup words="Create New Budget" delay={0.08} />
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
                onClick={() => onCreateBudget()}
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
                  Create Budget{" "}
                </span>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
