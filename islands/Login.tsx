import { useState } from "preact/hooks";
import Entry from "~/islands/Entry.tsx";
import { login } from "~/state/auth.ts";
import Changelog from "~/islands/Changelog.tsx";
import Error from "~/islands/Error.tsx";

export default function Login() {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [session, setSession] = useState<string>("");

  const handleLogin = async () => {
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
      body: JSON.stringify({ phoneNumber: element.value }),
    });

    if (!data.ok) {
      return setError(
        (await data.json() as { error: { message: string } }).error.message,
      );
    }

    const { sessionInfo } = await data.json();
    setSession(sessionInfo);
    setDisabled(false);
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
      body: JSON.stringify({ sessionInfo: session, code: element.value }),
    });

    if (!data.ok) {
      return setError(JSON.stringify(await data.json(), null, 2));
    }
    login(await data.json());
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
      <Changelog />
    </div>
  );
}
