"use client";

import { Button } from "@chakra-ui/react";
import type { NavItem } from "epubjs";

export function TableOfContentItem(props: NavItem) {
  const { label, subitems } = props;
  return (
    <div>
      <Button variant="link">{label}</Button>
      {subitems!.map((item) => (
        <TableOfContentItem key={item.id} {...props} {...item} />
      ))}
    </div>
  );

  return null;
}
