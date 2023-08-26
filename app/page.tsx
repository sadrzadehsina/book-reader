"use client";

import { useScreenValue } from "./hooks/use-shell";
import { Dashboard } from "./dashboard";
import { Reader } from "./reader";

export default function Shell() {
  const screen = useScreenValue();

  if (screen === "reading") return <Reader />;

  return <Dashboard />;
}
