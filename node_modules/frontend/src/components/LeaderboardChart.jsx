import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function LeaderboardChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="user_id"
          tickFormatter={(id) => `User-${id.slice(0, 4)}`}
        />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Bar dataKey="score" fill="#22c55e" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}