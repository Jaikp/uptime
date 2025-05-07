"use client"
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { Bell, CheckCircle2, Clock, Globe, Shield } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Home() {

  const features = [
    {
      icon: <Globe className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      title: 'Global Monitoring',
      description: 'Monitor your services from multiple locations worldwide'
    },
    {
      icon: <Bell className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      title: 'Instant Alerts',
      description: 'Get notified immediately when services go down'
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      title: 'Security First',
      description: 'Enterprise-grade security for your monitoring needs'
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      title: 'Historical Data',
      description: 'Access detailed uptime history and analytics'
    }
  ];

  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth()
  const router = useRouter();
  if(!isLoaded){
    return <div>loading</div>
  }

  return (
    <div>
   <div className="relative bg-white dark:bg-gray-800 overflow-hidden">
   <div className="max-w-7xl mx-auto">
     <div className="relative z-10 pb-8 bg-white dark:bg-gray-800 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
       <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
         <div className="text-center">
           <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
             <span className="block">Monitor Your Services</span>
             <span className="block text-blue-600 dark:text-blue-400">With Confidence</span>
           </h1>
           <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
           Get real-time insights into your service&apos;s uptime. Monitor, alert, and respond to incidents before they impact your users.

           </p>
           <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
             <div className="rounded-md shadow">
               <button onClick={()=>router.push('/monitors/new')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 md:py-4 md:text-lg md:px-10">
                 Start Monitoring
               </button>
             </div>
           </div>
         </div>
       </main>
     </div>
   </div>
 </div>

 <div id="features" className="py-12 bg-white dark:bg-gray-800">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="text-center">
       <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
         Powerful Monitoring Features
       </h2>
     </div>
     <div className="mt-10">
       <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
         {features.map((feature, index) => (
           <div key={index} className="flex flex-col items-center">
             <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-50 dark:bg-blue-900">
               {feature.icon}
             </div>
             <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">{feature.title}</h3>
             <p className="mt-2 text-base text-gray-500 dark:text-gray-400 text-center">{feature.description}</p>
           </div>
         ))}
       </div>
     </div>
   </div>
 </div>
 </div>
  );
}
