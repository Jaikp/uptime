"use server"
import prisma from "@/db/prisma";

export async function delMonitor(id : any) {
    const response1 = await prisma.alert.deleteMany({
        where :{
            monitorId : id
        }
    });

    const response = await prisma.monitor.delete({
        where :{
            id : id
        }
    });
    return response;
}