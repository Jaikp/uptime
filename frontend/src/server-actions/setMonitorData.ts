"use server"
import prisma from "@/db/prisma";
import { z } from "zod";

export async function setMonitorData(id: string, values: { url: string; alert: string; notify: string[]; }) {

    const response = await prisma.monitor.update({
        where :{
            id : id
        },
        data : {
            url : values.url,
        }
    })
    return response;
}