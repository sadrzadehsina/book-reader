"use client";

import { Button } from "@chakra-ui/react";
import type { NavItem } from "epubjs";

interface ItemProps extends NavItem {
  onClick: (href: string) => void;
}

export function TableOfContentItem(props: ItemProps) {
  const { label, subitems, href, onClick } = props;
  return (
    <div>
      <Button variant="link" onClick={() => onClick(href)}>
        {label}
      </Button>
      {subitems!.map((item) => (
        <TableOfContentItem key={item.id} {...props} {...item} />
      ))}
    </div>
  );

  return null;
}