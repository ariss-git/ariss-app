import { supabase } from "../lib/supabase";
import { Button } from "@/components/ui/button";

export default function Login() {
  const handleOAuthLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/",
      },
    });

    if (error) {
      console.log(error.message);
      return;
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen flex-col gap-y-6">
      <Button type="button" onClick={handleOAuthLogin}>
        Continue with Google
      </Button>
    </div>
  );
}
