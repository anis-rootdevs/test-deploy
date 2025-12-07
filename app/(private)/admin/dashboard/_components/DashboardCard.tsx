import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function DashboardCard({ total, active, label }: any) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="font-bold text-[15px]">
          {label}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {active ? `${active} / ${total}` : total}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingUp />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
