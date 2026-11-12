"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type AccordionItem = {
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  const values = items.map((_, index) => String(index));

  return (
    <RadixAccordion.Root
      type="multiple"
      defaultValue={values}
      className="rounded-card bg-card px-5 py-1"
    >
      {items.map((item, index) => (
        <RadixAccordion.Item
          key={values[index]}
          value={values[index]}
          className="border-b border-stroke-light py-4 last:border-b-0"
        >
          <RadixAccordion.Header asChild>
            <h2>
              <RadixAccordion.Trigger className="group focus-ring flex w-full items-center justify-between gap-4 rounded-sm text-left text-body leading-6 font-bold">
                {item.title}
                <Icon
                  name="chevron-down"
                  className="shrink-0 text-icon-primary transition-transform motion-reduce:transition-none group-data-[state=closed]:-rotate-90"
                />
              </RadixAccordion.Trigger>
            </h2>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="pt-2 pr-10 text-body font-book text-text-secondary">
            {item.content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
