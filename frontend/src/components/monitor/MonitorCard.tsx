"use client"
import { monitorurl } from '@/types/monitorurl';
import Link from 'next/link';
import React from 'react'
import { LuActivity, LuAlertTriangle } from "react-icons/lu";

const MonitorCard = ({ url, status, id }: monitorurl) => {
  return (
    <Link href={`/monitors/${id}`} className="block">
      <div className="w-full border border-grey-50 bg-gray-100  transition-all duration-300 
          flex items-center justify-between px-6 py-4 rounded-lg shadow-sm">
        <p className="text-black font-medium text-lg truncate max-w-[70%]">{url}</p>
        
        <div className={`flex items-center text-2xl ${
          status === "UP" ? "text-green-400" : "text-yellow-400"
        } animate-pulse`}>
          {status === "UP" ? <LuActivity /> : <LuAlertTriangle />}
        </div>
      </div>
    </Link>
  );
}

export default MonitorCard;
