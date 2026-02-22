import { AppointmentStatus, DoctorStatus } from "@prisma/client";

export type ServiceProps={
  title:string,
  image:string,
  slug:string,
}

export type RegisterInputProps={
  page: any;
  medicalLicenseExpiry: Date;
  dob: Date;
  fullName:string; 
  email:string; 
  password:string; 
  phone:string; 
  role:any; 
  plan:any;
};

export type LoginInputProps={
  email:string; 
  password:string;
};

export type BioDataFormProps = {
  firstName: string;
  lastName: string;
  dob: any;
  gender: string;
  page: string;
  //userId: string|undefined;
  userId: string;
  trackingNumber: string;
};

export type ProfileFormProps = {
  profilePicture: string;
  bio: string;
  page: string;
  medicalLicense:string;
  medicalLicenseExpiry:any;
  yearsOfExperience:number;
  hourlyWage:number;
};

export type ContactInfoFormProps = {
  phone: string;
  email: string;
  page: string;
  country: string;
  city: string;
};

export type stats = {
  doctors: string;
  patients: string;
  appointments: string;
  services: string;
};

export type DoctorProfileAvailability = {
  monday:string[];
  tuesday:string[];
  wednesday:string[];
  thursday:string[];
  friday:string[];
  saturday:string[];
  sunday:string[];
};

export interface DoctorProfile {
  //id:string;
  firstName:string;
  lastName:string;
  gender:string;
  bio:string | null;
  profilePicture:string | null;
  operationMode:string | null;
  hourlyWage:number;
  availability: DoctorProfileAvailability | null;

  //specialty:string;  //added myself
};

interface DoctorProfileDetail extends DoctorProfile {
  id:string|null;
  dob:Date;
  yearsOfExperience:number|null;
  bio:string | null;
  country:string|null;
  city:string|null;
  status:DoctorStatus;
  medicalLicense: string | null; // add this
  medicalLicenseExpiry: Date | null; // and this
  email:string|null;
  phone:string|null;
}

export type DoctorDetail = {
  id:string;
  name:string;
  email:string;
  phone:string;
  slug:string;
  doctorProfile: DoctorProfileDetail | null;
};

export type Doctor = {
  id:string;
  name:string;
  email:string;
  phone:string;
  slug:string;
  doctorProfile: DoctorProfile | null;
};

export interface AppointmentProps{
  appointmentDate:Date|undefined;
  appointmentFormattedDate:string;
  //appointmentMonth:string;
  doctorId:string;
  doctorName:string;
  //doctorProfileId?:string;
  charge:number;
  appointmentTime:string;

  //Patient details
  firstName:string;
  lastName:string; 
  gender:string;
  phone:string; 
  email:string;
  dob?:Date;
  location:string; 
  appointmentReason:string;
  occupation:string; 
  medicalDocuments?:string[];
  patientId:string;

  //status:string;
  status:AppointmentStatus;
  meetingLink:string;
  meetingProvider:string;
};

export type InboxProps = {
  receiverId:string;
  userId:string;
  senderId:string;
  senderName:string;
  senderEmail:string;
  subject:string;
  body:string;
};