import { useEffect } from "react";
import { useRenditionValue } from "../hooks/use-rendition";

export function useDarkTheme() {
  const rendition = useRenditionValue();

  useEffect(() => {
    if (!rendition) return;

    rendition.themes.register("dark", {
      "html, body": {
        color: "#FCFCFC",
        "background-color": "#111111",
        "font-family": "'Open Sans', sans-serif!important",
      },
      "p, span, div, ul, li, a": {
        color: "#FCFCFC!important",
        "font-family": "'Open Sans', sans-serif!important",
      },
      "h1, h2, h3, h4, h5, h6": {
        color: "#FCFCFC!important",
        "font-family": "'Open Sans', sans-serif!important",
      },
      ".highlight-bold": {
        "background-color": "#444444!important",
        "font-family": "'Open Sans', sans-serif!important",
      },
      "*": {
        "border-color": "white!important",
        "font-family": "'Open Sans', sans-serif!important",
      },
      ".id-frame, .id-frame1": {
        "background-color": "#111111!important",
        "font-family": "'Open Sans', sans-serif!important",
      },
      hr: {
        "background-color": "white",
      },
      "div.sidebar": {
        "background-color": "#111111!important",
      },
    });
    rendition.themes.fontSize("120%");
    rendition.themes.select("dark");
  }, [rendition]);
}
