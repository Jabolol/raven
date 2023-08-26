export default function () {
  return (
    <div className="dark:bg-black dark:text-white h-screen flex flex-col items-center justify-center">
      <img
        className="my-6 rounded-md"
        src="/raven.png"
        width="128"
        height="128"
        alt="the raven logo"
      />
      <h1 className="text-4xl font-bold">404 - Page not found</h1>
      <p className="my-4">
        The page you were looking for doesn't exist.
      </p>
      <a href="/" className="underline">
        Go back home
      </a>
    </div>
  );
}
