import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

  export type FAQItem = {
    question: string;
    answer: string | React.ReactNode; //ans can be text or html
  };

  
  export default function CustomAccordion({FAQS}:{FAQS:FAQItem[]}) {
    return (
      <Accordion type="single" collapsible className="w-full">
        {
            FAQS.map((faq,i)=>{
                return(
                    <AccordionItem key={i} value={faq.question}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                        {faq.answer}
                    </AccordionContent>
                    </AccordionItem>
                );
            })
        }
      </Accordion>
    );
  }
  