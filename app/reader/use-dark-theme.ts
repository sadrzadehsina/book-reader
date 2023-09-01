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
      },
      "p, span, div, ul, li, a": {
        color: "#FCFCFC!important",
      },
      "h1, h2, h3, h4, h5, h6": {
        color: "#FCFCFC!important",
      },
      ".highlight-bold": {
        "background-color": "#444444!important",
      },
      "*": {
        "border-color": "white!important",
      },
      '.id-frame, .id-frame1': {
        'background-color': '#111111!important'
      }
    });

    rendition.themes.select("dark");
  }, [rendition]);
}
