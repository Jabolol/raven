import { useState } from "preact/hooks";
import Entry from "~/islands/Entry.tsx";
import { login, refresh } from "~/state/auth.ts";
import Error from "~/islands/Error.tsx";

export default function Login() {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [session, setSession] = useState<string>("");
  const [isRetry, setIsRetry] = useState<boolean>(false);

  const handleLogin = async (retry = false): Promise<void> => {
    const element = document.getElementById("login-entry") as
      | HTMLInputElement
      | null;
    if (!element || !element.value) {
      return setError("Input a valid phone number");
    }

    const data = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: element.value, retry }),
    });

    const res = await data.json();

    const err = res as { error?: { message: string } };

    if (!data.ok) {
      if (!retry) {
        return handleLogin(true);
      }
      return setError((err.error ?? { message: "UNKNOWN ERROR" }).message);
    }

    const payload = res as {
      sessionInfo: string;
      vonageRequestId: string;
    };
    setSession(!isRetry ? payload.sessionInfo : payload.vonageRequestId);
    console.log({ session });
    setDisabled(false);
    setIsRetry(retry);
  };

  const handleVerify = async () => {
    const element = document.getElementById("verify-entry") as
      | HTMLInputElement
      | null;
    if (!element || !element.value) {
      return setError("Input a valid code");
    }

    if (!/^\d{6}$/.test(element.value)) {
      return setError("The code must be 6 digits long");
    }

    const data = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionInfo: session,
        code: element.value,
        isRetry,
      }),
    });

    const res = await data.json();

    const err = res as { error?: { message: string } };

    if (!data.ok) {
      return setError((err.error ?? { message: "UNKNOWN ERROR" }).message);
    }
    login(res);
    if (isRetry) {
      await refresh();
    }
    setDisabled(true);
  };

  return (
    <div className="flex flex-col items-center dark:bg-gray-800 py-6">
      <Entry
        id="login-entry"
        title="Login"
        description="You will receive an OTP via SMS"
        placeholder="+34 XXX XXX XXX"
        buttonText="Send"
        disabled={!disabled}
        handler={handleLogin}
      />
      {error && <Error message={error} />}
      <Entry
        id="verify-entry"
        title="Verify"
        description="Input the code you received"
        placeholder="XXXXXX"
        buttonText="Next"
        disabled={disabled}
        handler={handleVerify}
      />
    </div>
  );
}
