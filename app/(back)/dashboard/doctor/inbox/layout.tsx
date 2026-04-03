import React, { ReactNode } from "react";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import NotAuthorized from "@/components/NotAuthorized";
import MailListPanel from "@/components/Dashboard/Doctor/MailListPanel";
import { Mail } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getInboxMessages, getSentMessages } from "@/actions/inbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function AppointmentLayout({children}:{children:ReactNode}) {

    const session = await getServerSession(authOptions);
    const user = session?.user
    if(user?.role !=="DOCTOR"){
        return(
            <NotAuthorized/>
        );
    }
    const messages = (await getInboxMessages(user?.id)).data||[];
    const sentMessages = (await getSentMessages(user?.id)).data||[];

    return(
        <div>
            {/* Header */}
            
           
            {/* 2Panels */}
            <div className="grid grid-cols-12">
               
                {/*List Panel*/}
                <div className="col-span-4 py-3 border-r">
                    <PanelHeader title="Messages" count={messages.length??0} icon={Mail}/>
                    <div className="px-3">
                        <Tabs defaultValue="received" className="">
                            <TabsList>
                                {/* <TabsTrigger value="received">Received</TabsTrigger> */}
                                {/* <TabsTrigger value="sent">Sent</TabsTrigger> */}
                                <TabsTrigger value="received">Received ({messages.length.toString().padStart(2,"0")})</TabsTrigger>
                                <TabsTrigger value="sent">Sent ({sentMessages.length.toString().padStart(2,"0")})</TabsTrigger>
                            </TabsList>
                            <TabsContent value="received">
                                <MailListPanel messages={messages} role={user?.role}/>
                            </TabsContent>
                            <TabsContent value="sent">
                                <MailListPanel messages={sentMessages} role={user?.role}/>
                            </TabsContent>
                        </Tabs>
                    </div>          
                </div>

                {/*Display Panel*/}
                <div className="col-span-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
