import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
    doctorProfileImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
      async ({ file }) => {
        console.log("file url", file.url);
        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { uploadedBy: "Elizarrrr"};
      }
    ),
    serviceImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
      async ({ file }) => {
        console.log("file url", file.url);
        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { uploadedBy: "Elizarrrr"};
      }
    ),
    doctorProfessionDocs: f({ pdf: { maxFileSize: "4MB" } }).onUploadComplete(
      async ({ file }) => {
        console.log("file url", file.url);
        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { uploadedBy: "Elizarrrr"};
      }
    ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
