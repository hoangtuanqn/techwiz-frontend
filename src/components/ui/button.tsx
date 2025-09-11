import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
    // Base styles
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-bold transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white shadow-lg hover:scale-105 hover:shadow-cyan-500/25",
                destructive:
                    "bg-destructive text-white shadow-lg hover:bg-destructive/80 focus-visible:ring-destructive/30 dark:focus-visible:ring-destructive/50 dark:bg-destructive/70",
                outline:
                    "border border-cyan-300 bg-white text-cyan-600 shadow hover:bg-cyan-50 hover:text-cyan-700 dark:border-cyan-400/60 dark:bg-white/90",
                secondary: "bg-slate-900 text-white shadow-lg hover:bg-slate-800",
                ghost: "bg-transparent text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 dark:hover:bg-cyan-500/10",
                link: "text-cyan-600 underline underline-offset-4 hover:text-fuchsia-500 hover:underline",
            },
            size: {
                default: "h-12 px-6 py-3 has-[>svg]:px-5 text-base",
                sm: "h-9 rounded-2xl gap-1 px-4 has-[>svg]:px-3 text-sm",
                lg: "h-14 rounded-2xl px-8 has-[>svg]:px-6 text-lg",
                icon: "size-12 p-0 flex items-center justify-center",
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
