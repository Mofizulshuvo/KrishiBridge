import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef(
  ({ className, side = "top", sideOffset = 4, delayDuration = 200, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      side={side}
      sideOffset={sideOffset}
      delayDuration={delayDuration}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]-out data-[state=closed]-out-0 data-[state=closed]-out-95",
        "data-[side=bottom]-in-from-top-2 data-[side=left]-in-from-right-2 data-[side=right]-in-from-left-2 data-[side=top]-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
);

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
