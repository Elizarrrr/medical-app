import Image from "next/image";
import React from "react";
import { Check } from "lucide-react";
import Pricing from "@/components/Frontend/Pricing";
import CustomButton from "@/components/CustomButton";
import CustomAccordion, { FAQItem } from "@/components/Frontend/CustomAccordion";

export default function page() {
    const features=[
        "Oasis brings patients to you",
        "Manage your availability seamlessly",
        "Integrated telehealth capabilities",
    ];

    const cards = [
        {title:"Begin Your Journey",
        description:"Start an new application to join our network of healthcare providers",
        link:"/register?role=DOCTOR&plan=free/",
        linkTitle:"Start new application"
        },
        {title:"Resume Application",
            description:"Pick up where you left off and complete onboarding process",
            link:"/onboarding/resume",
            linkTitle:"Continue your application"
        },
        {title:"Schedule a Call",
            description:"Arrange a time for a call to finalize your application",
            link:"/",
            linkTitle:"Schedule call"
        },
        {title:"Track Your Progress",
            description:"Monitor the status of your application and approval",
            link:"/",
            linkTitle:"Check Status"
        }
    ];

    // Create the FAQ array
    const faqs: FAQItem[] = [
        {
        question: "How do I book an appointment?",
        answer: (
            <span>
            Simply click on <strong className="text-sky-600">&quot;Book Appointment&quot;</strong> at the top of the page, select your preferred provider, and follow the prompts.
            </span>
        )
        },
        {
        question: "How can I reset my password?",
        answer: (
            <span>
            To reset your password, click on the <strong className="text-sky-600">&quot;Forgot Password&quot;</strong> link on the login page. Enter your registered email, and we&apos;ll send you instructions to create a new password. If you need further assistance, please contact our support team.
            </span>
        )
        },
        {
        question: "Is my personal data secure?",
        answer: (
            <span>
            Yes, we prioritize your data security. All personal information is encrypted and stored according to industry standards. For more details, please see our{" "}
            <a href="/privacy-policy" className="text-sky-600 underline">Privacy Policy</a>.
            </span>
        )
        },
        {
        question: "What services are available through the app?",
        answer: "Our app provides appointment booking, e-prescriptions, record management, and patient communications, all in one place."
        },
        {
        question: "Can I use the platform for both virtual and in-person consultations?",
        answer: "Yes, the platform is designed to support both virtual and in-person consultations seamlessly."
        },
        {
        question: "How can I contact customer support?",
        answer: (
            <span>
            You can reach our support team at any time via our <a href="/contact" className="text-sky-600 underline">Contact page</a> or call us at 1-800-555-HELP.
            </span>
        )
        }
    ];

    return(
        <div className="min-h-screen">
            <section className="py-12 px-4">
                <div className="max-w-6xl gap-8 mx-auto grid grid-cols-1 md:grid-cols-2">
                <div className="">
                    <h2 className="sm:text-[3rem] text-[1.5rem] leading-[3.5rem]">
                        Build a thriving{" "}
                        <span className="text-sky-700 font-semibold">direct-pay</span>{" "} practice with Oasis
                    </h2>
                    <p className="py-4">
                        Transform your practice with our full-service platform designed for seamless patient care—whether virtual, in-person, or both.
                        Our platform streamlines the process of managing appointments and keeping track of patient records. 
                    </p>
                    <CustomButton title="List your Service" href="#" className="bg-sky-700 text-white hover:bg-sky-800"/>
                    {<div className="py-6">
                    {
                        features.map((feature,i)=>{
                            return(
                                <p key={i} className="flex items-center">
                                    <Check className="w-4 h-4 mr-2 flex-shrink-0 text-sky-700 dark:text-white"/>
                                    {feature}
                                </p>
                            );
                        })
                    }
                    </div>}
                </div>  
                <Image src="/doctor1.jpg" alt="null" width={1000} height={666} className="w-full"/>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-6xl gap-8 mx-auto grid grid-cols-1 md:grid-cols-2">
                <Image src="/nursepic.jpg" alt="null" width={1000} height={666} className="w-full hidden md:block"/>
                <div className="">
                    <h2 className="sm:text-3xl text-2xl">
                        Join Oasis to increase your{" "}
                        <span className="text-sky-700 font-semibold">revenue</span>{" "} today
                    </h2>

                    <div className="grid grid-cols-2 gap-4 py-6">
                        {
                            cards.map((card,i)=>{
                                return(
                                    <div key={i} className="bg-slate-100 py-4 px-2.5 rounded-lg shadow-2xl text-center dark:bg-slate-800">
                                        <h3 className="text-2xl font-semibold text-black dark:text-white">
                                            {card.title}
                                        </h3>
                                        <p className="text-gray-800 text-xs py-3 dark:text-gray-200">{card.description}</p>
                                        <CustomButton title={card.linkTitle} href={card.link} className="bg-sky-700 text-white hover:bg-sky-800"/>
                                    </div>
                                );
                            })
                        }
                    </div> 
                </div>       
            </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-6xl gap-4 mx-auto">
                 <Pricing/>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-2xl gap-4 mx-auto">
                 <CustomAccordion FAQS={faqs}/>
                </div>
            </section>

        </div>
    );
}