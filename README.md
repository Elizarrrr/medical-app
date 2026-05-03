# Medical Appointment Booking Platform

A modern healthcare marketplace connecting patients with doctors through an intuitive booking system. Built with Next.js 16, React 19, and TypeScript.

## 🎯 Overview

Three-tier healthcare platform enabling:
- **Patients**: Browse doctors, book appointments, make payments
- **Doctors**: Manage profiles, availability, and appointments
- **Admins**: Oversee platform operations and commissions

## ✨ Key Features

- **Advanced Search & Filtering** - Search by services, specialties, operation mode (Telehealth/In-person)
- **Smart Booking System** - Interactive calendar with real-time availability
- **Doctor Onboarding** - Multi-step verification process with document uploads
- **Dual Operation Modes** - Support for both telehealth and in-person consultations
- **Email Notifications** - Automated appointment confirmations via Resend
- **Secure Authentication** - NextAuth.js with role-based access control
- **Payment Integration** - Stripe for secure transactions (planned)

## 🚀 Tech Stack

### Core
- **Framework**: Next.js 16.1.5 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.19
- **UI Components**: shadcn/ui, Radix UI, Flowbite React

### Backend & Database
- **Database**: MongoDB Atlas
- **ORM**: Prisma 5.22.0
- **Authentication**: NextAuth.js 4.24.13

### Additional Services
- **File Uploads**: UploadThing 7.7.4
- **Email**: Resend 6.9.2
- **Payments**: Stripe (integration ready)
- **Animations**: Framer Motion 12.29.2

### Developer Tools
- **Form Handling**: React Hook Form 7.71.2 + Zod 4.3.6
- **Date Handling**: React DatePicker 9.1.0
- **Notifications**: React Hot Toast 2.6.0

## 🔧 Installation

```bash
# Clone repository
git clone <repository-url>
cd medical-app

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add your MongoDB, Resend, NextAuth, and UploadThing credentials

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev
```

## 📋 Environment Variables

```env
DATABASE_URL="mongodb+srv://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
RESEND_API_KEY="..."
UPLOADTHING_SECRET="..."
```

## 🌐 Live Demo

**Production URL**: https://medical-8if9bgusq-elizarrrrs-projects.vercel.app/

## 📱 User Flows

### Patient Journey
1. Browse doctors by service/specialty/mode
2. Select doctor and view availability
3. Book appointment with preferred time slot
4. Receive email confirmation
5. Access appointment details and meeting links

### Doctor Journey
1. Register with role selection (Free/Professional/Enterprise)
2. Complete multi-step onboarding (Bio Data → Profile → Contact → Availability)
3. Upload credentials and profile picture
4. Set weekly availability schedule
5. Manage incoming appointment requests
6. Approve/reject appointments with meeting links

### Admin Capabilities
- Manage services and specialties
- Monitor platform activity
- Handle doctor verifications
- Track appointments and commissions

## 🗂️ Project Structure

```
medical-app/
├── app/                    # Next.js app directory
│   ├── (front)/           # Public-facing pages
│   ├── (back)/            # Dashboard/admin pages
│   └── api/               # API routes
├── components/            # React components
├── actions/               # Server actions
├── lib/                   # Utilities and configs
├── prisma/               # Database schema
└── types/                # TypeScript definitions
```

## 🎨 Features Highlight

- **Responsive Design** - Mobile-first approach with dark mode support
- **Real-time Updates** - Server actions with path revalidation
- **Type Safety** - Full TypeScript coverage
- **Accessible UI** - WCAG compliant components
- **SEO Optimized** - Server-side rendering with metadata

---

**Built with ❤️ using Next.js and modern web technologies**
