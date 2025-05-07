"use client";

import EditMonitor from "@/components/monitor/EditMonitor";
import { Button } from "@/components/ui/button";
import { delMonitor } from "@/server-actions/delMonitor";
import { getMonitorData } from "@/server-actions/getMonitorData";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Trash2, Clock } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const router = useRouter();
  const { slug } = React.use(params); // Unwrap the params Promise

  const [values, setValues] = useState<{
    id: string;
    url: string;
    status: string;
    frequency: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [time, setTime] = useState({ Days: 0, Hours: 0, Minutes: 0 });

  useEffect(() => {
    async function loadData() {
      const response = await getMonitorData(slug);
      setValues(response);
      setLoading(false);

      const time1: any = new Date(response?.updatedAt || "");
      const time2: any = new Date();
      const Days = (time2 - time1) / 86_400_000;
      const Hours = (time2 - time1) / 3_600_000;
      const Minutes = (time2 - time1) / 60_000;
      setTime({
        Days: Math.trunc(Days),
        Hours: Math.trunc(Hours),
        Minutes: Math.trunc(Minutes % 60),
      });
    }

    loadData();
  }, [slug, edit]);

  const handleDelete = async () => {
    await delMonitor(slug);
    router.push("/monitors");
  };

  // Redirect if unauthenticated
  if (!isSignedIn) {
    router.push("/");
    return null;
  }

  // Show loading state
  if (loading || !isLoaded) {
    return (
      <div className="w-screen h-screen flex justify-center items-center animate-pulse">
        <h1 className="text-2xl text-white">Loading...</h1>
      </div>
    );
  }

  if (edit) {
    return <EditMonitor id={slug} setEdit={setEdit} url={values?.url} />;
  }

  return (
    <div className="flex justify-center mt-10 text-white">
      <div className="max-w-[600px] w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6">
        {/* Status Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{values?.url}</h1>
          {values?.status === "UP" ? (
            <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">UP</span>
          ) : (
            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">DOWN</span>
          )}
        </div>

        {/* Last Checked Time */}
        
          <div className="mt-2 flex items-center gap-2 text-gray-300">
            <Clock size={16} />
            
            {values?.status === "UP" ? <p className="text-sm">Uptime: {time.Days}d {time.Hours}h {time.Minutes}m ago </p> : <p className="text-sm">Downtime: {time.Days}d {time.Hours}h {time.Minutes}m ago </p>}
            
          </div>
        

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <Button onClick={() => setEdit(true)} className="bg-blue-500 hover:bg-blue-600">
            Edit
          </Button>
          <button onClick={handleDelete} className="bg-transparent p-2 rounded-lg hover:bg-gray-800 transition">
            <Trash2 className="w-6 h-6 text-gray-400 hover:text-red-500 transition" />
          </button>
        </div>
      </div>
    </div>
  );
}
