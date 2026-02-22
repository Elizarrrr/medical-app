import { getUserById } from "@/actions/users";
import VerifyTokenForm from "@/components/Frontend/VerifyTokenForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function VerifyAccount({
  params,  // Changed: Don't destructure params directly
}: {
  params: Promise<{ id: string }>;  // Changed: params is now a Promise
}) {
  // Added: Await params first, then get the id
  const { id } = await params;
  
  // Get a User from DB
  const user = await getUserById(id);
  const userToken = user?.token;
  const role = user?.role;
  
  return (
      <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Verify Token</CardTitle>
        <CardDescription>
          Please enter the 6-figure pass code sent to your email - {user?.email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerifyTokenForm role={role} userToken={userToken} id={id} />
      </CardContent>
    </Card>
    </div>
  );
}