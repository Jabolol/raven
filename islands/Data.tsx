import { Chart } from "charts/island.tsx";
import { useEffect, useState } from "preact/hooks";
import { isLoggedIn } from "../state/auth.ts";
import Spinner from "../components/Spinner.tsx";

export default function Data() {
  const [data, setData] = useState<
    { dates: Date[]; results: { [k: string]: number[] } } | null
  >(null);

  useEffect(() => {
    if (!isLoggedIn.value) window.location.href = "/";
    fetch("/api/stats").then((res) => res.json()).then(setData);
  }, []);

  if (data === null) {
    return <Spinner />;
  }

  const datasets = [
    {
      label: "total",
      data: data?.results["total"] ?? [],
      borderColor: "#be185d",
    },
    {
      label: "/user/:id",
      data: data?.results["user"] ?? [],
      borderColor: "#e85d04",
    },
    {
      label: "/me",
      data: data?.results["me"] ?? [],
      borderColor: "#219ebc",
    },
    {
      label: "/",
      data: data?.results["/"] ?? [],
      borderColor: "#023e8a",
    },
    {
      label: "/stats",
      data: data?.results["stats"] ?? [],
      borderColor: "#4338ca",
    },
  ];

  const max = Math.max(...datasets[0].data);

  const labels = data.dates.map((date) =>
    new Date(date).toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
    })
  );

  return (
    <>
      <main className="flex-1 p-4 flex flex-col items-center justify-center">
        <h1 className="text-center text-gray-800 dark:text-white text-2xl font-semibold mb-4">
          Stats
        </h1>
        <div className="my-20 mx-4 p-4 max-w-lg w-full bg-white dark:bg-gray-800 border-2 border-gray-800 dark:border-white rounded-md shadow-md">
          <div className="w-full h-96">
            <Chart
              type="line"
              options={{
                maintainAspectRatio: false,
                interaction: {
                  intersect: false,
                  mode: "index",
                },
                scales: {
                  x: {
                    max,
                    grid: { display: false },
                  },
                  y: {
                    beginAtZero: true,
                    grid: { display: false },
                    ticks: { precision: 0 },
                  },
                },
              }}
              data={{
                labels,
                datasets: datasets.map((dataset) => ({
                  ...dataset,
                  pointRadius: 0,
                  cubicInterpolationMode: "monotone",
                })),
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
