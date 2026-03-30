import React from "react";
import { getDoctors } from "@/actions/users";
import DoctorCard from "@/components/DoctorCard";

export default async function NewAppointment(){

  const doctors = await getDoctors()||[];
  console.log(doctors);
  const telehealthDoctors = doctors.filter((doctor)=>doctor.doctorProfile?.operationMode==="Telehealth Visit");
  const inpersonDoctors = doctors.filter((doctor)=>doctor.doctorProfile?.operationMode==="In-person doctor Visit");
  //console.log(telehealthDoctors);

  return(
    <section className="">

        <h2 className="font-semibold py-3 text-xl lg:text-3xl">Select a Doctor to Continue</h2>
        {telehealthDoctors && telehealthDoctors.length>0 && (
            <div className="py-4">
            <h2 className="px-4 border-b mb-3 font-semibold py-3 text-xl lg:text-3xl">Telehealth doctors</h2>
            <div className="grid place-items-center">
                {
                    telehealthDoctors.map((doctor)=>{
                        return (<DoctorCard key={doctor.id} isInPerson={false} doctor={doctor}/>);
                    })
                }
            </div>
        </div>
        )}

        {inpersonDoctors && inpersonDoctors.length > 0 && (
            <div className="py-4">
            <h2 className="px-4 border-b mb-3 font-semibold py-3 text-xl lg:text-3xl">In-person doctors</h2>
            <div className="grid place-items-center">
                {
                    inpersonDoctors.map((doctor)=>{
                        return (<DoctorCard key={doctor.id} isInPerson={true} doctor={doctor}/>);
                    })
                }
            </div>
        </div>
        )}

    </section>
  );
}
