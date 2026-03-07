import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// import AnalyticsCard from "../AnalyticsCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { getAdminAnalytics } from "../../actions/stats"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { generateInitials } from "../../utils/generateInitials"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getDoctors } from "@/actions/users"

export default async function Dashboard() {
//   const analytics = await getAdminAnalytics();
  const doctors = await getDoctors()||[];
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">

          {
            statsCards.map((item,i)=>{
              const Icon = item.icon
              return (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {item.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.count}</div>
                    <Link href={item.href} className="text-xs text-muted-foreground">
                      View all {item.title}
                    </Link>
                  </CardContent>
                </Card>
              );
            })
          }
         
        </div> */}

         <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
              Welcome, Admin {user?.name}
          </h1>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analytics.map((item,i)=>{
                  return (
                      <AnalyticsCard key={i} data={item}/>
                  );
              })}
          </div> */}

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Doctors</CardTitle>
                <Button asChild>
                  <Link href="/dashboard/doctors">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-8">
              {
                doctors && doctors.slice(0,5).map((doctor)=>{
                  const initials = generateInitials(doctor.name);
                  return(
                    <div key={doctor.id} className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={doctor.doctorProfile?.profilePicture??""} alt="Avatar" />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {doctor.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {doctor.email}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <button className="text-sm">Approve</button>
                      </div>
                    </div>
                  );
                })
              }

            </CardContent>
          </Card>
        </div>
        
      </main>
  );
}