import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
    // Base styles
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-cyan-500 text-white shadow hover:bg-cyan-600",
                destructive:
                    "bg-red-500 text-white shadow hover:bg-red-600 focus-visible:ring-red-300 dark:focus-visible:ring-red-500",
                outline:
                    "border border-cyan-300 bg-white text-cyan-600 shadow hover:bg-cyan-50 hover:text-cyan-700 dark:border-cyan-400/60 dark:bg-white/90",
                secondary: "bg-slate-800 text-white shadow hover:bg-slate-700",
                ghost: "bg-transparent text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 dark:hover:bg-cyan-500/10",
                link: "text-cyan-600 underline underline-offset-4 hover:text-fuchsia-500",
            },
            size: {
                default: "h-11 px-5 py-2.5 text-base",
                sm: "h-8 rounded-lg gap-1 px-3 text-sm",
                lg: "h-13 rounded-lg px-7 text-lg",
                icon: "size-11 p-0 flex items-center justify-center",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
