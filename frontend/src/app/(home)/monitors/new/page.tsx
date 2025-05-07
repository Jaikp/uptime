"use client"
import React, { useEffect, useState } from 'react'
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
import { storeData } from '@/server-actions/storeData'
import { useAuth } from '@clerk/nextjs'
  
const formSchema = z.object({
    url: z.string().min(6, {
        message: "Input a valid URL",
    }),
    alert: z.string().min(2, {
        message: "You must select an alert condition.",
    }),
    notify: z.array(z.string()).min(1, {
        message: "Select at least one notification method.",
    }),
})

const Page = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const { isLoaded, isSignedIn } = useAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          url: "https://",
          alert: '',
          notify: [],
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitting(true);
        const response = await storeData(values);
        if (response) router.push("/monitors");
        setSubmitting(false);
        toast({
            variant: 'default',
            title: 'Monitor Created',
            description: 'Your monitor has been created successfully.',
          });
    }

    useEffect(() => {
        if (!isSignedIn) {
            router.push('/');
            toast({
                variant: "destructive",
                title: "Access Denied",
                description: "Please log in to continue."
            })
        }
    }, [isSignedIn])

    if (!isLoaded) return <div className="text-center mt-10 text-white">Loading...</div>;

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
                        <Button 
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            type="submit" 
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page;