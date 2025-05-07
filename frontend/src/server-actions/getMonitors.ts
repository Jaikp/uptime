"use server"
import prisma from "@/db/prisma";
import { auth } from "@clerk/nextjs/server";


export async function getMonitors() {

    const {userId} = await auth();
    const response = await prisma.monitor.findMany({
        where : {
            userId : userId || ""
        }
    })
    return response;
}