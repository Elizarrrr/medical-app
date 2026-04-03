import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DoctorAnalyticsProps } from "@/actions/stats";
import Link from "next/link";

export default function AnalyticsCard({data}:{data:DoctorAnalyticsProps}) {
    const Icon = data.icon;
    return(
        <Card className="border-gray-300 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{data.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{data.unit}{data.count.toString().padStart(2,"0")}</div>
                <Link href={data.detailLink} className="text-xs text-muted-foreground">View Details</Link>
            </CardContent>
        </Card>
        
        // <Card className="@container/card">
        //     <CardHeader className="relative">
        //     <CardDescription>Total Revenue</CardDescription>
        //     <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
        //         $1,250.00
        //     </CardTitle>
        //     <div className="absolute right-4 top-4">
        //         <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
        //         <TrendingUpIcon className="size-3" />
        //         +12.5%
        //         </Badge>
        //     </div>
        //     </CardHeader>
        //     <CardFooter className="flex-col items-start gap-1 text-sm">
        //     <div className="line-clamp-1 flex gap-2 font-medium">
        //         Trending up this month <TrendingUpIcon className="size-4" />
        //     </div>
        //     <div className="text-muted-foreground">
        //         Visitors for the last 6 months
        //     </div>
        //     </CardFooter>
        // </Card>
    );
}