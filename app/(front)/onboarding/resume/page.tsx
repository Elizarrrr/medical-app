import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TrackingForm from "@/components/Frontend/TrackingForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function VerifyTrackingNumber() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  if (id) {
      redirect(`/onboarding/${id}`)
  }
  return (
      <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Resume your Application</CardTitle>
        <CardDescription>
          Please enter the 10-character Tracking number that was given to you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TrackingForm/>
      </CardContent>
    </Card>
    </div>
  );
}

