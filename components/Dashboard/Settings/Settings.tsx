import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import GeneralSettings from "./GeneralSettings";


// export const description = "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings."

// export const iframeHeight = "780px"

// export const containerClassName = "w-full h-full"

export default function Settings() {
  const tabs = [
    {
      label:"General",
      value:"general",
      component:<GeneralSettings/>
    },
    {
      label:"Security",
      value:"security",
      component:<></>
    },
    {
      label:"Integrations",
      value:"integrations",
      component:<></>
    },
    {
      label:"Support",
      value:"support",
      component:<></>
    },
    {
      label:"Organizations",
      value:"organizations",
      component:<></>
    },
    {
      label:"Advanced",
      value:"advanced",
      component:<></>
    }
  ]

  return (  
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-6 md:gap-8">
        <Tabs defaultValue="all">
        <div className="flex items-center">
            <TabsList>
            {tabs.map((tab)=>{
                return(
                    <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
                );
                })}  
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
            
            <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
                </span>
            </Button>
            </div>
        </div>
        {tabs.map((tab)=>{
            return(
            <TabsContent className="w-full"  key={tab.value} value={tab.value??"general"}>{tab.component}</TabsContent>
            );
        })}
        </Tabs>
    </main>
  );
}