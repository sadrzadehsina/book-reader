"use client";

import { useScreenValue } from "./hooks/use-screen";
import { Dashboard } from "./dashboard";
import { Reader } from "./reader";

export default function Shell() {
  const screen = useScreenValue();

  if (screen === "reader") return <Reader />;

  return <Dashboard />;
}
