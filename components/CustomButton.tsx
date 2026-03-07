import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ElementType } from "react";

type CustomButtonProps = {
  title: string;
  icon?: ElementType; // Use ElementType for React components
  href?: string;
  className?: string;
};

export default function CustomButton({
  title,
  icon: Icon, // Renaming during destructuring for clarity
  href,
  className,
}: CustomButtonProps) {
  return (
    <>
      {href ? (
        <Button asChild className={className}>
          <Link href={href} className="flex items-center">
            {Icon && <Icon className="mr-2 h-4 w-4"/>} {/* Use the renamed Icon */}
            {title}
          </Link>
        </Button>
      ) : (
        <Button className={className}>
          {Icon && <Icon className="mr-2 h-4 w-4"/>}
          {title}
        </Button>
      )}
    </>
  );
}