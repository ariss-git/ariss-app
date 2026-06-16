import { useSignIn } from "@clerk/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState, type FormEvent } from "react";

const Login = () => {
  const { signIn, fetchStatus } = useSignIn();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (fetchStatus === "fetching") return;

    try {
      const { error } = await signIn.sso({
        strategy: "oauth_google",
        redirectCallbackUrl: "/sso-callback",
        redirectUrl: "/",
      });

      if (error) {
        console.error(error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault();

    if (fetchStatus === "fetching") return;

    try {
      setLoading(true);

      const { error } = await signIn.emailLink.sendLink({
        emailAddress: email,
        verificationUrl: `${window.location.origin}/verify`,
      });

      if (error) {
        console.error(error);
        return;
      }

      setEmailSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            ARISS Workspace
          </CardTitle>

          <CardDescription className="text-center">
            Sign in with your email or Google account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Login"}
              </Button>

              <Button type="button" variant="outline">
                Sign Up
              </Button>
            </div>

            <div className="relative py-2">
              <Separator />

              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                OR
              </span>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={handleGoogleSignIn}
            >
              Continue with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
