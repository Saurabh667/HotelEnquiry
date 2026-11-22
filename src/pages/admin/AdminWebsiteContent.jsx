import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import {
  Home, Star, Image, Info, Phone, Save, Eye, UploadCloud,
  GripVertical, Plus, Trash2, CheckCircle2
} from "lucide-react";

const initialFeatured = [
  { id: 1, name: "The Oberoi Udaivilas", location: "Udaipur, Rajasthan", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500", active: true },
  { id: 2, name: "Wildflower Hall", location: "Shimla, Himachal Pradesh", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500", active: true },
  { id: 3, name: "Taj Lake Palace", location: "Udaipur, Rajasthan", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500", active: true },
];

function Section({ icon: Icon, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#E9E4D9] bg-white">
      <div className="flex items-start gap-3 border-b border-[#E9E4D9] px-5 py-4">
        <span className="rounded-lg bg-[#F4F1EA] p-2 text-[#A17B3F]"><Icon size={18}/></span>
        <div><h3 className="font-serif text-xl text-[#182333]">{title}</h3>{description && <p className="mt-1 text-xs text-[#737A82]">{description}</p>}</div>
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", rows, hint }) {
  const common = "w-full rounded-lg border border-[#E9E4D9] bg-white px-3.5 py-3 text-sm text-[#182333] outline-none transition placeholder:text-[#A5A7A8] focus:border-[#B18A45]";
  return <label className="block min-w-0"><span className="mb-2 block text-[10px] font-semibold tracking-[1px] text-[#59616B]">{label}</span>{rows ? <textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder} className={`${common} resize-y leading-6`}/> : <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={common}/ >}{hint && <span className="mt-1.5 block text-xs text-[#92979D]">{hint}</span>}</label>;
}

export default function AdminWebsiteContent() {
  const [homepage, setHomepage] = useState({
    heroTitle: "Discover exceptional stays.", heroDescription: "Thoughtfully curated hotels and unforgettable experiences across India.",
    introTitle: "Stay somewhere extraordinary.", introDescription: "Explore distinctive properties selected for their character, comfort and sense of place.",
    heroImage: "", aboutTitle: "A more thoughtful way to discover stays.", aboutDescription: "HotelEnquiry connects travellers with exceptional places to stay, making it easier to discover a property that feels just right.",
    aboutImage: "", contactEmail: "hello@hotel-enquiry.com", contactPhone: "+91 98765 43210",
    address: "India", instagram: "", linkedin: ""
  });
  const [featured, setFeatured] = useState(initialFeatured);
  const [activeTab, setActiveTab] = useState("homepage");
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState(false);

  const update = (key, value) => { setHomepage(current => ({ ...current, [key]: value })); setSaved(false); };
  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 2500); };
  const toggleFeatured = id => setFeatured(current => current.map(item => item.id === id ? { ...item, active: !item.active } : item));
  const removeFeatured = id => setFeatured(current => current.filter(item => item.id !== id));

  const tabs = [
    { id: "homepage", label: "Homepage", icon: Home },
    { id: "featured", label: "Featured Hotels", icon: Star },
    { id: "about", label: "About Section", icon: Info },
    { id: "contact", label: "Contact Details", icon: Phone },
  ];

  return (
    <AdminLayout>
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><h2 className="font-serif text-3xl text-[#182333]">Website Content</h2><p className="mt-1 text-sm text-[#737A82]">Manage the content displayed across your public HotelEnquiry website.</p></div>
        <div className="flex gap-2">
          <button onClick={() => setPreview(true)} className="inline-flex items-center gap-2 rounded-lg border border-[#E9E4D9] bg-white px-4 py-2.5 text-sm text-[#182333] hover:border-[#B18A45]"><Eye size={16}/> Preview</button>
          <button onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-[#182333] px-4 py-2.5 text-sm text-white hover:bg-[#B18A45]"><Save size={16}/> Save Changes</button>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-[#E9E4D9] pb-2">
        {tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setActiveTab(id)} className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-3 text-sm transition ${activeTab === id ? "bg-[#182333] text-white" : "text-[#737A82] hover:bg-white hover:text-[#182333]"}`}><Icon size={16}/>{label}</button>)}
      </div>

      {activeTab === "homepage" && <div className="space-y-6">
        <Section icon={Home} title="Hero Section" description="The main banner visitors see when they open your website.">
          <Field label="HERO HEADING" value={homepage.heroTitle} onChange={e => update("heroTitle", e.target.value)} placeholder="Enter hero heading"/>
          <Field label="HERO DESCRIPTION" rows={3} value={homepage.heroDescription} onChange={e => update("heroDescription", e.target.value)} placeholder="Write a short introduction"/>
          <Field label="HERO BACKGROUND IMAGE URL" value={homepage.heroImage} onChange={e => update("heroImage", e.target.value)} placeholder="https://example.com/hero-image.jpg" hint="Paste an image URL. Image upload integration will be added with the backend."/>
        </Section>
        <Section icon={Info} title="Homepage Introduction" description="Short introduction shown below the hero banner.">
          <Field label="INTRODUCTION HEADING" value={homepage.introTitle} onChange={e => update("introTitle", e.target.value)} placeholder="Introduction heading"/>
          <Field label="INTRODUCTION DESCRIPTION" rows={4} value={homepage.introDescription} onChange={e => update("introDescription", e.target.value)} placeholder="Describe your platform"/>
        </Section>
      </div>}

      {activeTab === "featured" && <Section icon={Star} title="Featured Hotels" description="Choose which hotels appear in the featured hotels section on the homepage.">
        <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-[#737A82]">{featured.filter(item => item.active).length} hotels currently featured</p><button onClick={() => alert("Hotel selection will be connected to the hotels API later.")} className="inline-flex items-center gap-2 rounded-lg bg-[#182333] px-4 py-2.5 text-sm text-white hover:bg-[#B18A45]"><Plus size={16}/> Add Featured Hotel</button></div>
        <div className="space-y-3">{featured.map(item => <div key={item.id} className="flex flex-col gap-4 rounded-xl border border-[#E9E4D9] p-3 sm:flex-row sm:items-center">
          <GripVertical className="hidden text-[#A5A7A8] sm:block" size={18}/>
          <img src={item.image} alt={item.name} className="h-24 w-full rounded-lg object-cover sm:w-32"/>
          <div className="min-w-0 flex-1"><p className="font-medium text-[#182333]">{item.name}</p><p className="mt-1 text-sm text-[#737A82]">{item.location}</p></div>
          <label className="flex items-center gap-2 text-sm text-[#59616B]"><input type="checkbox" checked={item.active} onChange={() => toggleFeatured(item.id)} className="h-4 w-4 accent-[#B18A45]"/> Featured</label>
          <button onClick={() => removeFeatured(item.id)} title="Remove from featured" className="rounded-lg p-2 text-[#92979D] hover:bg-red-50 hover:text-red-600"><Trash2 size={17}/></button>
        </div>)}</div>
      </Section>}

      {activeTab === "about" && <Section icon={Info} title="About Section" description="Manage the story and image displayed on your About page.">
        <Field label="ABOUT HEADING" value={homepage.aboutTitle} onChange={e => update("aboutTitle", e.target.value)} placeholder="About heading"/>
        <Field label="ABOUT DESCRIPTION" rows={6} value={homepage.aboutDescription} onChange={e => update("aboutDescription", e.target.value)} placeholder="Tell visitors about HotelEnquiry"/>
        <Field label="ABOUT IMAGE URL" value={homepage.aboutImage} onChange={e => update("aboutImage", e.target.value)} placeholder="https://example.com/about-image.jpg"/>
      </Section>}

      {activeTab === "contact" && <Section icon={Phone} title="Contact Information" description="Contact details and social links shown on the public website.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="CONTACT EMAIL" type="email" value={homepage.contactEmail} onChange={e => update("contactEmail", e.target.value)} placeholder="hello@example.com"/>
          <Field label="CONTACT PHONE" value={homepage.contactPhone} onChange={e => update("contactPhone", e.target.value)} placeholder="+91 ..."/>
          <Field label="BUSINESS ADDRESS" value={homepage.address} onChange={e => update("address", e.target.value)} placeholder="Enter business address"/>
          <Field label="INSTAGRAM URL" value={homepage.instagram} onChange={e => update("instagram", e.target.value)} placeholder="https://instagram.com/..."/>
          <Field label="LINKEDIN URL" value={homepage.linkedin} onChange={e => update("linkedin", e.target.value)} placeholder="https://linkedin.com/..."/>
        </div>
      </Section>}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E9E4D9] bg-white p-4">
        <p className="text-xs text-[#92979D]">Changes are currently stored in this page preview only.</p>
        <button onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-[#182333] px-5 py-3 text-sm text-white transition hover:bg-[#B18A45]"><Save size={16}/> Save Changes</button>
      </div>
      {saved && <p role="status" className="mt-3 flex items-center gap-2 text-sm text-emerald-700"><CheckCircle2 size={16}/> Changes saved in this preview.</p>}

      {preview && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#182333]/50 p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-[#FDFBF7] p-6 shadow-2xl">
          <div className="mb-5 flex items-center justify-between"><h3 className="font-serif text-2xl text-[#182333]">Content Preview</h3><button onClick={() => setPreview(false)} className="rounded-lg p-2 text-[#737A82] hover:bg-[#F4F1EA]">✕</button></div>
          <div className="rounded-xl bg-[#182333] px-6 py-12 text-center text-white"><p className="text-xs tracking-[3px] text-[#D7B46B]">HOTELENQUIRY</p><h4 className="mt-4 font-serif text-4xl">{homepage.heroTitle}</h4><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/75">{homepage.heroDescription}</p></div>
          <div className="py-7 text-center"><h4 className="font-serif text-3xl text-[#182333]">{homepage.introTitle}</h4><p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#737A82]">{homepage.introDescription}</p></div>
        </div>
      </div>}
    </AdminLayout>
  );
}
