"use client";

import type { NavItem } from "epubjs";

export function TableOfContentItem(props: NavItem) {
  const { label, subitems } = props;
  return (
    <div>
      <button>{label}</button>
      {subitems && subitems.length > 0 && (
        <div>
          {subitems.map((item) => (
            <TableOfContentItem key={item.id} {...props} {...item} />
          ))}
        </div>
      )}
    </div>
  );

  return null;
}
