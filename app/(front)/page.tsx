import { getDoctors } from "@/actions/users";
import DoctorsList from "@/components/DoctorsList";
import Brands from "@/components/Frontend/Brands";
import Hero from "@/components/Frontend/Hero";
import TabbedSection from "@/components/Frontend/TabbedSection";
import React from "react";

export default async function Home() {

  const doctors = (await getDoctors())||[];
  //console.log(doctors);
  const telehealthDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth Visit"
  );
  const inpersonDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person doctor Visit"
  );
  //console.log(telehealthDoctors);

  return (
    <section className="">
      <Hero/>
      {/* <Brands/> */}
      <TabbedSection/>
      <DoctorsList doctors={telehealthDoctors} title="Telehealth Visit"/>
      <DoctorsList className="bg-white py-8 lg:py-24 dark:bg-black" title="In-person doctor Visit" isInPerson={true} doctors={inpersonDoctors}/>
    </section>
  );
}
