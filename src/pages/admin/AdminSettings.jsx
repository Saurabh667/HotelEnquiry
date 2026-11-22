import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { UserRound, ShieldCheck, SlidersHorizontal, Save, Camera, Eye, EyeOff, CheckCircle2, Clock3 } from "lucide-react";

function Section({ icon: Icon, title, description, children }) {
  return <section className="overflow-hidden rounded-xl border border-[#E9E4D9] bg-white">
    <div className="flex items-start gap-3 border-b border-[#E9E4D9] px-5 py-4">
      <span className="rounded-lg bg-[#F4F1EA] p-2 text-[#A17B3F]"><Icon size={18}/></span>
      <div><h3 className="font-serif text-xl text-[#182333]">{title}</h3><p className="mt-1 text-xs text-[#737A82]">{description}</p></div>
    </div>
    <div className="space-y-5 p-5">{children}</div>
  </section>;
}

function Field({ label, value, onChange, type = "text", placeholder }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-semibold tracking-[1px] text-[#59616B]">{label}</span><input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full rounded-lg border border-[#E9E4D9] bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-[#A5A7A8] focus:border-[#B18A45]"/></label>;
}

export default function AdminSettings() {
  const [tab, setTab] = useState("profile");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState({ name: "HotelEnquiry Administrator", email: "admin@hotel-enquiry.com", phone: "+91 98765 43210" });
  const [platform, setPlatform] = useState({ name: "HotelEnquiry", email: "hello@hotel-enquiry.com", currency: "INR", timezone: "Asia/Kolkata" });
  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [visible, setVisible] = useState({});

  const update = (setter, key, value) => { setter(old => ({ ...old, [key]: value })); setMessage(""); };
  const tabs = [{ id: "profile", label: "Profile", icon: UserRound }, { id: "security", label: "Security", icon: ShieldCheck }, { id: "platform", label: "Platform", icon: SlidersHorizontal }];

  const passwordInput = (key, label) => <label className="block"><span className="mb-2 block text-[10px] font-semibold tracking-[1px] text-[#59616B]">{label}</span><span className="flex items-center rounded-lg border border-[#E9E4D9] pr-3 focus-within:border-[#B18A45]"><input type={visible[key] ? "text" : "password"} value={password[key]} onChange={e => update(setPassword, key, e.target.value)} placeholder={label.toLowerCase()} className="w-full min-w-0 bg-transparent px-3.5 py-3 text-sm outline-none"/><button type="button" onClick={() => setVisible(v => ({ ...v, [key]: !v[key] }))} className="text-[#92979D]">{visible[key] ? <EyeOff size={17}/> : <Eye size={17}/>}</button></span></label>;

  const savePassword = e => {
    e.preventDefault();
    if (password.next.length < 8) return setMessage("New password must contain at least 8 characters.");
    if (password.next !== password.confirm) return setMessage("New password and confirmation do not match.");
    setPassword({ current: "", next: "", confirm: "" });
    setMessage("Password validation passed. Backend integration is required to update it.");
  };

  return <AdminLayout>
    <div className="mb-7"><h2 className="font-serif text-3xl text-[#182333]">Settings</h2><p className="mt-1 text-sm text-[#737A82]">Manage your administrator profile, account security and platform preferences.</p></div>
    <div className="mb-6 flex gap-2 overflow-x-auto border-b border-[#E9E4D9] pb-2">
      {tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { setTab(id); setMessage(""); }} className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-3 text-sm transition ${tab === id ? "bg-[#182333] text-white" : "text-[#737A82] hover:bg-white hover:text-[#182333]"}`}><Icon size={16}/>{label}</button>)}
    </div>

    {tab === "profile" && <Section icon={UserRound} title="Administrator Profile" description="Update the profile information associated with your administrator account.">
      <form onSubmit={e => { e.preventDefault(); setMessage("Profile changes saved in this preview."); }} className="space-y-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F4F1EA] text-[#A17B3F]"><UserRound size={32}/></div><div><p className="font-medium text-[#182333]">Profile photo</p><p className="mt-1 text-xs text-[#92979D]">Image upload will be connected during backend integration.</p><button type="button" onClick={() => setMessage("Profile image upload will be available after backend integration.")} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[#E9E4D9] px-3 py-2 text-xs text-[#59616B] hover:border-[#B18A45]"><Camera size={15}/> Change photo</button></div></div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="ADMINISTRATOR NAME" value={profile.name} onChange={e => update(setProfile, "name", e.target.value)} placeholder="Enter your name"/>
          <Field label="EMAIL ADDRESS" type="email" value={profile.email} onChange={e => update(setProfile, "email", e.target.value)} placeholder="admin@example.com"/>
          <Field label="PHONE NUMBER" value={profile.phone} onChange={e => update(setProfile, "phone", e.target.value)} placeholder="+91 ..."/>
        </div>
        <div className="flex justify-end"><button className="inline-flex items-center gap-2 rounded-lg bg-[#182333] px-5 py-3 text-sm text-white hover:bg-[#B18A45]"><Save size={16}/> Save Profile</button></div>
      </form>
    </Section>}

    {tab === "security" && <Section icon={ShieldCheck} title="Account Security" description="Change the password used to access the HotelEnquiry administration portal.">
      <form onSubmit={savePassword} className="max-w-2xl space-y-5">
        {passwordInput("current", "CURRENT PASSWORD")}{passwordInput("next", "NEW PASSWORD")}{passwordInput("confirm", "CONFIRM NEW PASSWORD")}
        <p className="text-xs leading-5 text-[#92979D]">Use at least 8 characters. For better security, combine letters, numbers and symbols.</p>
        <div className="flex justify-end"><button className="inline-flex items-center gap-2 rounded-lg bg-[#182333] px-5 py-3 text-sm text-white hover:bg-[#B18A45]"><ShieldCheck size={16}/> Update Password</button></div>
      </form>
    </Section>}

    {tab === "platform" && <Section icon={SlidersHorizontal} title="Platform Preferences" description="Configure general website and regional preferences.">
      <form onSubmit={e => { e.preventDefault(); setMessage("Platform settings saved in this preview."); }} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="WEBSITE NAME" value={platform.name} onChange={e => update(setPlatform, "name", e.target.value)} placeholder="Website name"/>
          <Field label="SUPPORT EMAIL" type="email" value={platform.email} onChange={e => update(setPlatform, "email", e.target.value)} placeholder="support@example.com"/>
          <label className="block"><span className="mb-2 block text-[10px] font-semibold tracking-[1px] text-[#59616B]">DEFAULT CURRENCY</span><select value={platform.currency} onChange={e => update(setPlatform, "currency", e.target.value)} className="w-full rounded-lg border border-[#E9E4D9] bg-white px-3.5 py-3 text-sm outline-none focus:border-[#B18A45]"><option value="INR">INR — Indian Rupee (₹)</option><option value="USD">USD — US Dollar ($)</option><option value="EUR">EUR — Euro (€)</option><option value="GBP">GBP — British Pound (£)</option></select></label>
          <label className="block"><span className="mb-2 block text-[10px] font-semibold tracking-[1px] text-[#59616B]">TIME ZONE</span><select value={platform.timezone} onChange={e => update(setPlatform, "timezone", e.target.value)} className="w-full rounded-lg border border-[#E9E4D9] bg-white px-3.5 py-3 text-sm outline-none focus:border-[#B18A45]"><option value="Asia/Kolkata">India Standard Time (Asia/Kolkata)</option><option value="UTC">Coordinated Universal Time (UTC)</option><option value="Europe/London">London (Europe/London)</option><option value="America/New_York">Eastern Time (America/New_York)</option></select></label>
        </div>
        <div className="flex justify-end"><button className="inline-flex items-center gap-2 rounded-lg bg-[#182333] px-5 py-3 text-sm text-white hover:bg-[#B18A45]"><Save size={16}/> Save Settings</button></div>
      </form>
    </Section>}

    {message && <p role="status" className={`mt-4 flex items-start gap-2 rounded-lg border px-4 py-3 text-sm ${message.includes("must") || message.includes("match") ? "border-red-100 bg-red-50 text-red-700" : "border-emerald-100 bg-emerald-50 text-emerald-700"}`}><CheckCircle2 size={17} className="mt-0.5 shrink-0"/>{message}</p>}
    <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#E9E4D9] bg-[#F4F1EA] p-4 text-xs leading-5 text-[#737A82]"><Clock3 size={16} className="mt-0.5 shrink-0 text-[#A17B3F]"/><p>Settings currently update the local page preview only. Profile changes, password updates and platform preferences will be persisted after connecting the Django backend.</p></div>
  </AdminLayout>;
}
