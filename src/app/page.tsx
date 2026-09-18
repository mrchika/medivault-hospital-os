"use client";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap'); *{font-family:'Plus Jakarta Sans',sans-serif}`}</style>

      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white font-bold text-xl">M</div>
            <div>
              <h1 className="font-bold text-[17px] leading-none">MediVault</h1>
              <p className="text-[11px] text-slate-500 font-semibold tracking-widest uppercase">Hospital OS • LIVE</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold">Dr. Eric Admin</p>
              <p className="text-xs text-emerald-600 font-bold">● System Operational</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-6 flex gap-6">
        <aside className="w-[240px] hidden lg:flex flex-col gap-2">
          {[
            {id:"dashboard", label:"Dashboard"},
            {id:"patients", label:"Patients"},
            {id:"pharmacy", label:"Pharmacy"},
            {id:"lab", label:"Laboratory"},
            {id:"billing", label:"Billing"},
            {id:"staff", label:"Staff"},
          ].map(item=>(
            <button key={item.id} onClick={()=>setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-[14px] transition ${activeTab===item.id?"bg-[#0f172a] text-white shadow-lg":"text-slate-600 hover:bg-white"}`}>
              {item.label}
            </button>
          ))}
          <div className="mt-6 p-4 bg-[#0f172a] rounded-2xl text-white">
            <p className="text-sm font-bold">Render Deployment</p>
            <p className="text-[11px] text-slate-400 mt-1 break-all">medivault-hospital-os.onrender.com</p>
            <p className="text-xs mt-3 text-emerald-400 font-bold">● LIVE</p>
          </div>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {k:"Total Patients", v:"1,248"},
              {k:"Admissions Today", v:"32", dark:true},
              {k:"Pharmacy Stock", v:"94%"},
              {k:"Revenue Today", v:"₦2.4M"},
            ].map(card=>(
              <div key={card.k} className={`p-6 rounded-[20px] border ${card.dark?"bg-[#0f172a] text-white":"bg-white"}`}>
                <p className="text-[11px] font-bold tracking-widest uppercase opacity-60">{card.k}</p>
                <p className="text-3xl font-bold mt-2">{card.v}</p>
                <p className="text-xs mt-2 opacity-60">+12% vs yesterday</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[20px] border p-6 mt-6">
            <h3 className="font-bold text-[16px]">Live Admissions</h3>
            <div className="mt-4 grid gap-3">
              {[
                {name:"Amina Yusuf", ward:"Emergency", status:"Critical"},
                {name:"Chinedu Okoro", ward:"Cardiology", status:"Stable"},
                {name:"Grace Nwachukwu", ward:"Maternity", status:"Stable"},
              ].map(p=>(
                <div key={p.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div><p className="font-bold text-sm">{p.name}</p><p className="text-xs text-slate-500">{p.ward}</p></div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${p.status==="Critical"?"bg-red-100 text-red-600":"bg-emerald-100 text-emerald-700"}`}>{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}