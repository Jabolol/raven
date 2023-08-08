import { useState } from "preact/hooks";

import Entry from "./Entry.tsx";
import { login } from "../state/auth.ts";

export default function Login() {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [session, setSession] = useState<string>("");

  const handleLogin = async () => {
    const element = document.getElementById("login-entry") as
      | HTMLInputElement
      | null;
    if (!element || !element.value) {
      setError("Input a valid phone number");
      await clearErrorAfterDelay();
      return;
    }

    if (!/^\+\d{1,4} \d{5,}$/.test(element.value)) {
      setError("Invalid format :: +[prefix] [number]");
      await clearErrorAfterDelay();
      return;
    }

    const data = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: element.value }),
    });

    if (!data.ok) {
      setError(`API error :: ${data.status}`);
      await clearErrorAfterDelay();
      return;
    }

    const { sessionInfo } = await data.json();
    setSession(sessionInfo);
    setDisabled(false);
  };

  const clearErrorAfterDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setError("");
  };

  const handleVerify = async () => {
    const element = document.getElementById("verify-entry") as
      | HTMLInputElement
      | null;
    if (!element || !element.value) {
      setError("Input a valid code");
      await clearErrorAfterDelay();
      return;
    }

    if (!/^\d{6}$/.test(element.value)) {
      setError("Invalid format :: [6 digits]");
      await clearErrorAfterDelay();
      return;
    }

    const data = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionInfo: session, code: element.value }),
    });

    if (!data.ok) {
      setError(`API error :: ${data.status}`);
      await clearErrorAfterDelay();
      return;
    }
    login(await data.json());
    setDisabled(true);
  };

  return (
    <main className="flex flex-col items-center h-screen dark:bg-gray-800">
      <Entry
        id="login-entry"
        title="Login"
        description="You will receive an OTP via SMS"
        placeholder="+34 XXX XXX XXX"
        buttonText="Send"
        disabled={!disabled}
        handler={handleLogin}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Entry
        id="verify-entry"
        title="Verify"
        description="Input the code you received"
        placeholder="XXXXXX"
        buttonText="Next"
        disabled={disabled}
        handler={handleVerify}
      />
    </main>
  );
}
