import { Text } from "@chakra-ui/react";
import { useMemo } from "react";

export function Greeting() {
  const d = new Date();

  const time = d.getHours();

  const message = useMemo(() => {
    if (time < 12) return "Good morning";

    if (time > 12 && time < 18) return "Good afternoon";

    return "Good night";
  }, [time]);

  return <Text variant="h1">{message}, Sina</Text>;
}
