"use client"
import MonitorCard from '@/components/monitor/MonitorCard';
import { useToast } from '@/hooks/use-toast';
import { getMonitors } from '@/server-actions/getMonitors';
import { monitorurl } from '@/types/monitorurl';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Page = () => {

      
  const [values, setValues] = useState<monitorurl[]>([]);
  const [filter, setFilter] = useState<monitorurl[]>([]);
  const { isLoaded, isSignedIn } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const response = await getMonitors();
      setValues(response);
      setFilter(response);
    }
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setFilter(query ? values.filter(item => item.url.toLowerCase().includes(query)) : values);
  };

  useEffect(() => {
    if (!isSignedIn) {
        router.push('/');
      toast({
        variant: 'destructive',
        title: 'You are not logged in',
        description: 'Login to get access',
      });
    }
  }, []);

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="max-w-4xl w-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-3xl font-semibold">Welcome back!</h1>
          <div className="flex gap-4">
            <Input
              onChange={handleChange}
              className="border border-gray-500 bg-white rounded-lg px-3 text-black py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search..."
            />
            <Button 
              onClick={() => router.push('/monitors/new')} 
              className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 px-6 rounded-lg shadow-md">
              + New Monitor
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full border border-white bg-white rounded-lg p-5 text-white shadow-lg">
          {filter.length > 0 ? (
            filter.map((value, index) => (
              <MonitorCard 
                key={index} 
                {...value} 
              />
            ))
          ) : (
            <p className="text-center text-gray-400">No monitors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;