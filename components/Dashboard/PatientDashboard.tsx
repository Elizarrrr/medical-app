import React from "react";
import AnalyticsCard from "../AnalyticsCard";
import { Session } from "next-auth";
import { getUserAnalytics } from "../../actions/stats";

export default async function PatientDashboard({session}:{session:Session|null}) {
    const user = session?.user;
    const analytics = await getUserAnalytics() || [];
    return(
        <div className="px-8 py-4">
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
                Welcome, {user?.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {analytics.map((item,i)=>{
                    return (
                        <AnalyticsCard key={i} data={item}/>
                    );
                })}
            </div>
        </div>
    );
}