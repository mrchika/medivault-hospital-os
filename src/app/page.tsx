"use client";
import { useState } from "react";

type Patient = { id:number; name:string; ward:string; status:string; phone:string };

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [patients, setPatients] = useState<Patient[]>([
    {id:1, name:"Amina Yusuf", ward:"Emergency", status:"Critical", phone:"0803-111-2222"},
    {id:2, name:"Chinedu Okoro", ward:"Cardiology", status:"Stable", phone:"0803-333-4444"},
    {id:3, name:"Grace Nwachukwu", ward:"Maternity", status:"Stable", phone:"0805-555-6666"},
  ]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"", ward:"General", status:"Stable", phone:""});
  const [drugs, setDrugs] = useState([
    {name:"Paracetamol 500mg", stock:1240, price:"₦500"},
    {name:"Amoxicillin 250mg", stock:860, price:"₦1,200"},
    {name:"Artemether", stock:45, price:"₦2,500"},
  ]);
  const [bills, setBills] = useState([
    {id:"INV-001", patient:"Amina Yusuf", amount:"₦45,000", status:"Paid"},
    {id:"INV-002", patient:"Chinedu Okoro", amount:"₦120,000", status:"Pending"},
  ]);

  const addPatient = () => {
    if(!form.name) return alert("Enter name");
    setPatients([...patients, {id:Date.now(),...form}]);
    setForm({name:"", ward:"General", status:"Stable", phone:""});
    setShowForm(false);
  };

  const deletePatient = (id:number) => setPatients(patients.filter(p=>p.id!==id));

  const filtered = patients.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap'); *{font-family:'Plus Jakarta Sans',sans-serif}`}</style>

      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white font-extrabold text-xl">M</div>
            <div><h1 className="font-extrabold text-[17px]">MediVault</h1><p className="text-[10px] text-slate-500 font-bold tracking-widest">HOSPITAL OS • v2 LIVE</p></div>
          </div>
          <div className="text-right"><p className="text-sm font-bold">Dr. Eric</p><p className="text-xs text-emerald-600 font-bold">● Operational</p></div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 py-4 flex gap-4">
        <aside className="w-[220px] hidden md:flex flex-col gap-1 shrink-0">
          {[
            {id:"dashboard", label:"📊 Dashboard"},
            {id:"patients", label:"🧑‍⚕️ Patients"},
            {id:"pharmacy", label:"💊 Pharmacy"},
            {id:"lab", label:"🔬 Laboratory"},
            {id:"billing", label:"🧾 Billing"},
            {id:"staff", label:"👥 Staff"},
          ].map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`text-left px-4 py-3 rounded-xl font-bold text-[14px] ${activeTab===t.id?"bg-[#0f172a] text-white shadow-lg":"text-slate-600 hover:bg-white"}`}>{t.label}</button>
          ))}
          <div className="mt-4 p-4 bg-emerald-600 rounded-2xl text-white text-sm font-bold">✅ v2 Clickable<br/><span className="text-[11px] font-normal opacity-90">All buttons now work!</span></div>
        </aside>

        <main className="flex-1 min-w-0">
          {activeTab==="dashboard" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {k:"Total Patients", v:patients.length.toString()},
                  {k:"Admissions Today", v:"32"},
                  {k:"Pharmacy Stock", v:"94%"},
                  {k:"Revenue", v:"₦2.4M"},
                ].map(c=>(
                  <div key={c.k} className="bg-white p-5 rounded-2xl border"><p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{c.k}</p><p className="text-2xl font-extrabold mt-1">{c.v}</p></div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border p-5 mt-4">
                <h3 className="font-bold">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  <button onClick={()=>{setActiveTab("patients"); setShowForm(true)}} className="p-4 bg-[#0f172a] text-white rounded-xl font-bold text-sm">+ New Patient</button>
                  <button onClick={()=>setActiveTab("pharmacy")} className="p-4 bg-blue-600 text-white rounded-xl font-bold text-sm">Pharmacy</button>
                  <button onClick={()=>setActiveTab("lab")} className="p-4 bg-purple-600 text-white rounded-xl font-bold text-sm">Lab Order</button>
                  <button onClick={()=>setActiveTab("billing")} className="p-4 bg-emerald-600 text-white rounded-xl font-bold text-sm">New Bill</button>
                </div>
              </div>
            </>
          )}

          {activeTab==="patients" && (
            <div className="bg-white rounded-2xl border p-5">
              <div className="flex flex-col md:flex-row gap-3 justify-between md:items-center">
                <h3 className="font-extrabold text-lg">Patients ({filtered.length})</h3>
                <div className="flex gap-2">
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search patients..." className="px-4 py-2 border rounded-xl text-sm w-full md:w-64"/>
                  <button onClick={()=>setShowForm(!showForm)} className="px-4 py-2 bg-[#0f172a] text-white rounded-xl font-bold text-sm whitespace-nowrap">+ Add</button>
                </div>
              </div>

              {showForm && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Full name" className="px-3 py-2 border rounded-lg text-sm"/>
                  <select value={form.ward} onChange={e=>setForm({...form, ward:e.target.value})} className="px-3 py-2 border rounded-lg text-sm">
                    <option>General</option><option>Emergency</option><option>Cardiology</option><option>Maternity</option><option>Pediatrics</option>
                  </select>
                  <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})} className="px-3 py-2 border rounded-lg text-sm">
                    <option>Stable</option><option>Critical</option><option>Observation</option>
                  </select>
                  <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="px-3 py-2 border rounded-lg text-sm"/>
                  <button onClick={addPatient} className="md:col-span-4 py-2 bg-emerald-600 text-white rounded-lg font-bold">Save Patient</button>
                </div>
              )}

              <div className="mt-4 space-y-2">
                {filtered.map(p=>(
                  <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div><p className="font-bold text-sm">{p.name}</p><p className="text-xs text-slate-500">{p.ward} • {p.phone}</p></div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${p.status==="Critical"?"bg-red-100 text-red-700":"bg-emerald-100 text-emerald-700"}`}>{p.status}</span>
                      <button onClick={()=>deletePatient(p.id)} className="text-xs bg-red-600 text-white px-3 py-1 rounded-lg font-bold">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab==="pharmacy" && (
            <div className="bg-white rounded-2xl border p-5">
              <h3 className="font-extrabold text-lg">Pharmacy Inventory</h3>
              <div className="mt-4 space-y-2">
                {drugs.map((d,i)=>(
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                    <div><p className="font-bold text-sm">{d.name}</p><p className="text-xs text-slate-500">{d.price} • Stock: {d.stock}</p></div>
                    <div className="flex gap-2">
                      <button onClick={()=>{const nd=[...drugs]; nd[i].stock+=10; setDrugs(nd)}} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg font-bold">+10 Stock</button>
                      <button onClick={()=>{const nd=[...drugs]; if(nd[i].stock>0) nd[i].stock-=1; setDrugs(nd)}} className="text-xs bg-slate-800 text-white px-3 py-1 rounded-lg font-bold">Dispense</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab==="lab" && (
            <div className="bg-white rounded-2xl border p-5">
              <h3 className="font-extrabold text-lg">Laboratory</h3>
              <p className="text-sm text-slate-500 mt-1">Click to order test - status updates instantly</p>
              <LabSection/>
            </div>
          )}

          {activeTab==="billing" && (
            <div className="bg-white rounded-2xl border p-5">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-lg">Billing</h3>
                <button onClick={()=>setBills([...bills, {id:`INV-00${bills.length+1}`, patient:"New Patient", amount:"₦25,000", status:"Pending"}])} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold">+ New Invoice</button>
              </div>
              <div className="mt-4 space-y-2">
                {bills.map((b,idx)=>(
                  <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                    <div><p className="font-bold text-sm">{b.id} - {b.patient}</p><p className="text-xs text-slate-500">{b.amount}</p></div>
                    <button onClick={()=>{const nb=[...bills]; nb[idx].status=nb[idx].status==="Paid"?"Pending":"Paid"; setBills(nb)}} className={`text-xs px-3 py-1 rounded-lg font-bold ${b.status==="Paid"?"bg-emerald-100 text-emerald-700":"bg-yellow-100 text-yellow-700"}`}>{b.status} - Click to toggle</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab==="staff" && (
            <div className="bg-white rounded-2xl border p-5">
              <h3 className="font-extrabold text-lg">Staff on Duty</h3>
              <div className="grid gap-2 mt-4">
                {[["Dr. Aisha Bello","Doctor","Emergency"],["Nurse John Doe","Nurse","Ward A"],["Pharm. Sarah","Pharmacist","Pharmacy"]].map((s,i)=>(
                  <div key={i} className="p-4 bg-slate-50 rounded-xl flex justify-between"><div><p className="font-bold text-sm">{s[0]}</p><p className="text-xs text-slate-500">{s[1]} • {s[2]}</p></div><span className="text-xs font-bold text-emerald-600">● Active</span></div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around z-50">
        {["dashboard","patients","pharmacy","billing"].map(id=>(
          <button key={id} onClick={()=>setActiveTab(id)} className={`text-[11px] font-bold px-3 py-2 rounded-lg ${activeTab===id?"bg-[#0f172a] text-white":"text-slate-500"}`}>{id}</button>
        ))}
      </div>
    </div>
  );
}

function LabSection(){
  const [tests, setTests] = useState([
    {name:"CBC Blood Test", patient:"Amina Yusuf", status:"Pending"},
    {name:"Malaria Test", patient:"Chinedu Okoro", status:"Completed"},
  ]);
  return (
    <div className="mt-4 space-y-2">
      {tests.map((t,i)=>(
        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
          <div><p className="font-bold text-sm">{t.name}</p><p className="text-xs text-slate-500">{t.patient}</p></div>
          <button onClick={()=>{const nt=[...tests]; nt[i].status=nt[i].status==="Pending"?"Completed":"Pending"; setTests(nt)}} className="text-xs bg-purple-600 text-white px-3 py-1 rounded-lg font-bold">{t.status}</button>
        </div>
      ))}
      <button onClick={()=>setTests([...tests, {name:"New Lab Test", patient:"Grace Nwachukwu", status:"Pending"}])} className="w-full py-3 border-2 border-dashed rounded-xl text-sm font-bold text-slate-500">+ Order New Test</button>
    </div>
  );
}