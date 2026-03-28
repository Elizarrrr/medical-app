import React from "react";
import ServiceForm from "@/components/Dashboard/ServiceForm";
import { getServiceBySlug } from "@/actions/services";

export default async function page({
    params // Don't destructure directly
}: {
    params: Promise<{slug: string}> // params is a Promise
}) {
    // Await params first, then extract slug
    const { slug } = await params;
    
    const service = (await getServiceBySlug(slug))?.data;
    
    return(
        <div>
            {service && service.id && (
                <ServiceForm 
                    className="text-black" 
                    title="Update Service" 
                    initialData={service}
                />
            )}
        </div>
    );
}
