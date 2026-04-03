"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Inbox, UserRole } from "@prisma/client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default function MailListPanel({messages,role}:{messages:Inbox[];role:UserRole}) {

    const pathname = usePathname();
    console.log(role);

    return(
        <ScrollArea className="h-screen w-full">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {messages.map((item) => (
            <Link
              href={`/dashboard/${role==="DOCTOR"?"doctor":"user"}/inbox/view/${item.id}`}
              key={item.id}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-left text-sm transition-all hover:bg-accent", 
                pathname===`/dashboard/${role==="DOCTOR"?"doctor":"user"}/inbox/view/${item.id}` && "border-sky-600"
                // mail.selected === item.id && "bg-muted"
              )}
              // onClick={() =>
              //   setMail({
              //     ...mail,
              //     selected: item.id,
              //   })
              // }
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.senderName}</div>
                    {/* {!item.read && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )} */}
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      // mail.selected === item.id
                      //   ? "text-foreground"
                      //   : "text-muted-foreground"
                    )}
                  >
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="text-xs font-medium">{item.subject}</div>
              </div>
              {/* <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.text.substring(0, 300)}
              </div> */}
              {/* {item.labels.length ? (
                <div className="flex items-center gap-2">
                  {item.labels.map((label) => (
                    <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                      {label}
                    </Badge>
                  ))}
                </div>
              ) : null} */}
            </Link>
          ))}
        </div>
      </ScrollArea>
    );
}