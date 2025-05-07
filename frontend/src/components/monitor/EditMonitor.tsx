"use client"
import React, { use, useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { setMonitorData } from '@/server-actions/setMonitorData'
import { getMonitorData } from '@/server-actions/getMonitorData'
import { useAuth } from '@clerk/nextjs'
  

const formSchema = z.object({
    url: z.string().min(6,{
        message : "input correct url",
    }),
    alert: z.string().min(2,{
        message: "You have to select at least one item.",
    }),
    notify: z.array(z.string()).min(1, {
        message: "You have to select at least one item.",
    }),
  })



function EditMonitor({id  , setEdit, url} : {id : string, setEdit : any, url: any}) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const { isLoaded,isSignedIn } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          url: url,
          alert: 'URL becomes unavailable',
          notify: ["Email"],
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitting(true);

        const response = await setMonitorData(id, values);
        
        if(response){
            setEdit(false);
        }

        setSubmitting(false);
    }
    if(!isLoaded){
        return <div>loading</div>
    }


  return (
        <div className='flex justify-center mt-10 px-4'>
            <div className='flex flex-col gap-6 max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg'>
                <h1 className='text-3xl text-black font-semibold text-center'>Create New Monitor</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem className='text-black'>
                                    <FormLabel>Website URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter URL" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="alert"
                            render={({ field }) => (
                                <FormItem className='text-black'>
                                    <FormLabel>Alert Trigger</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Alert Condition" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="URL becomes unavailable">URL becomes unavailable</SelectItem>
                                                <SelectItem value="Slow response time">Slow response time</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="notify"
                            render={({ field }) => (
                                <FormItem className='text-black'>
                                    <FormLabel>Notification Methods</FormLabel>
                                    <div className="flex flex-wrap gap-4">
                                        {["SMS", "Email", "Call"].map((method) => (
                                            <div key={method} className="flex items-center gap-2">
                                                <Checkbox
                                                    className='border border-white'
                                                    checked={field.value.includes(method)}
                                                    onCheckedChange={(checked) => {
                                                        const newValue = checked
                                                            ? [...field.value, method]
                                                            : field.value.filter((v) => v !== method);
                                                        field.onChange(newValue);
                                                    }}
                                                />
                                                <span>{method}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" type="submit" disabled={submitting}>
                        {!submitting ? "Update" : "Updating..."}
                         </Button>
                    </form>
                </Form>
            </div>
        </div>
  )
}

export default EditMonitor

