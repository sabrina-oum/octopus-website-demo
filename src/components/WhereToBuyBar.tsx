import { whereToBuyLink } from "@/navigation";
import { ButtonLink } from "./Button";

export function WhereToBuyBar() {
  return (
    <div
      data-where-to-buy-bar
      className="fixed inset-x-0 bottom-0 z-10 h-where-to-buy-bar border-t border-stroke-light bg-white p-2.5 tablet:hidden"
    >
      <ButtonLink href={whereToBuyLink.href} className="w-full">
        {whereToBuyLink.label}
      </ButtonLink>
    </div>
  );
}
