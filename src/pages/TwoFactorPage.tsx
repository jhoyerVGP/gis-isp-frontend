import { Card, CardContent } from "@/components/ui/card";
import TwoFactorForm from "@/features/auth/components/TwoFactorForm";

function TwoFactorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <TwoFactorForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default TwoFactorPage;
