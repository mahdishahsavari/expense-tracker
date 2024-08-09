import React from "react";
import { BudgetListItem } from "./BudgetList";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LetterPullup from "./LetterPullup";

function BarChartDashboard({
  budgetList,
}: {
  budgetList: BudgetListItem[] | undefined;
}) {
  return (
    <div className="border rounded-lg p-5 m-5">
      <LetterPullup words="Activity" />
      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart data={budgetList}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#2F3843" />
          <Bar dataKey="amount" stackId="b" fill="#E88073" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
