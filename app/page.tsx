"use client";

import { useScreen } from "./hooks/use-shell";
import { Reading } from "./components/screen/reading";
import { Landing } from "./components/screen/landing";

export default function Shell() {
  const [screen] = useScreen();

  if (screen === "reading") return <Reading />;

  return <Landing />;
}
