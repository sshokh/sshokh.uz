"use client";

import { useEffect, useState } from "react";

const BIRTH = new Date("2010-01-02T00:00:00Z").getTime();
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

export function AgeCounter() {
  const [years, setYears] = useState(null);

  useEffect(() => {
    const tick = () => setYears((Date.now() - BIRTH) / YEAR_MS);
    tick();
    const id = setInterval(tick, 50);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{years === null ? "—" : years.toFixed(8)}</span>;
}
