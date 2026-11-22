import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, UserRound, Mail, Phone, MapPin, CalendarDays, Users,
  BedDouble, Utensils, Clock3, FileText, Save, MessageSquareText,
  CheckCircle2, XCircle, ClipboardList
} from "lucide-react";
import AdminLayout from "./AdminLayout";

const sampleEnquiries = {
  "HE-1180": {
    id: "HE-1180", name: "Arjun Mehta", email: "arjun.mehta@gmail.com",
    phone: "+91 98765 43210", hotel: "The Oberoi Udaivilas",
    destination: "Udaipur, Rajasthan", checkIn: "13 December 2026",
    checkOut: "16 December 2026", guests: 2, adults: 2, children: 0,
    rooms: 1, roomType: "Deluxe Lake View", meal: "Breakfast included",
    submitted: "22 November 2026, 10:42 AM", status: "New",
    message: "We are celebrating our anniversary and would appreciate a room with a beautiful lake view. Please share availability and any special packages.",
    notes: "Guest prefers email communication. Follow up with anniversary package details."
  },
  "HE-1181": {
    id: "HE-1181", name: "Priya Sharma", email: "priya.sharma@outlook.com",
    phone: "+91 98201 45632", hotel: "Taj Lake Palace",
    destination: "Udaipur, Rajasthan", checkIn: "26 December 2026",
    checkOut: "29 December 2026", guests: 3, adults: 2, children: 1,
    rooms: 2, roomType: "Suite", meal: "Half board",
    submitted: "22 November 2026, 9:15 AM", status: "Pending",
    message: "Please provide options for two rooms close to each other and confirm whether an extra bed can be arranged.",
    notes: ""
  },
  "HE-1182": {
    id: "HE-1182", name: "Rohan Kapoor", email: "rohan.kapoor@yahoo.com",
    phone: "+91 99100 22114", hotel: "Wildflower Hall",
    destination: "Shimla, Himachal Pradesh", checkIn: "01 December 2026",
    checkOut: "06 December 2026", guests: 2, adults: 2, children: 0,
    rooms: 1, roomType: "Mountain View", meal: "Breakfast included",
    submitted: "21 November 2026, 4:30 PM", status: "Confirmed",
    message: "Looking for a quiet mountain getaway. Please confirm the room and transfer options from the airport.",
    notes: "Confirmation shared with guest."
  }
};

const statuses = ["New", "Pending", "Contacted", "Confirmed", "Cancelled", "Closed"];

function InfoCard({ title, icon: Icon, children }) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#E9E4D9] bg-white">
      <div className="flex items-center gap-2 border-b border-[#E9E4D9] px-5 py-4">
        <Icon size={17} className="text-[#B18A45]" />
        <h3 className="font-serif text-lg text-[#182333]">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Detail({ label, value, icon: Icon }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-medium tracking-[1px] text-[#92979D]">{label}</p>
      <div className="mt-1.5 flex items-start gap-2 text-sm text-[#182333]">
        {Icon && <Icon size={15} className="mt-0.5 shrink-0 text-[#A17B3F]" />}
        <span className="break-words">{value || "—"}</span>
      </div>
    </div>
  );
}

export default function AdminEnquiryDetails() {
  const { id } = useParams();
  const initial = useMemo(() => sampleEnquiries[id] || sampleEnquiries["HE-1180"], [id]);
  const [status, setStatus] = useState(initial.status);
  const [notes, setNotes] = useState(initial.notes);
  const [saved, setSaved] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link to="/admin/enquiries" className="inline-flex items-center gap-2 text-sm text-[#737A82] transition hover:text-[#B18A45]">
          <ArrowLeft size={16} /> Back to Enquiries
        </Link>
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-serif text-3xl text-[#182333]">Enquiry Details</h2>
              <span className="rounded-md bg-[#F4F1EA] px-2.5 py-1 text-xs font-medium text-[#A17B3F]">{initial.id}</span>
            </div>
            <p className="mt-1 text-sm text-[#737A82]">Review the guest request and manage its status.</p>
          </div>
          <span className={`w-fit rounded-full px-3 py-1.5 text-xs font-medium ${status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : status === "Cancelled" ? "bg-red-50 text-red-700" : status === "New" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
            {status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <InfoCard title="Customer Information" icon={UserRound}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Detail label="FULL NAME" value={initial.name} icon={UserRound} />
              <Detail label="EMAIL ADDRESS" value={initial.email} icon={Mail} />
              <Detail label="PHONE NUMBER" value={initial.phone} icon={Phone} />
              <Detail label="ENQUIRY SUBMITTED" value={initial.submitted} icon={Clock3} />
            </div>
          </InfoCard>

          <InfoCard title="Travel Information" icon={CalendarDays}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Detail label="HOTEL OF INTEREST" value={initial.hotel} />
              <Detail label="DESTINATION" value={initial.destination} icon={MapPin} />
              <Detail label="CHECK-IN" value={initial.checkIn} icon={CalendarDays} />
              <Detail label="CHECK-OUT" value={initial.checkOut} icon={CalendarDays} />
              <Detail label="TOTAL GUESTS" value={`${initial.guests} guests (${initial.adults} adults, ${initial.children} children)`} icon={Users} />
              <Detail label="NUMBER OF ROOMS" value={initial.rooms} icon={BedDouble} />
              <Detail label="ROOM TYPE" value={initial.roomType} icon={BedDouble} />
              <Detail label="MEAL PREFERENCE" value={initial.meal} icon={Utensils} />
            </div>
          </InfoCard>

          <InfoCard title="Additional Requirements" icon={MessageSquareText}>
            <p className="whitespace-pre-wrap text-sm leading-7 text-[#59616B]">{initial.message || "No additional requirements provided."}</p>
          </InfoCard>
        </div>

        <aside className="space-y-6">
          <InfoCard title="Manage Enquiry" icon={ClipboardList}>
            <form onSubmit={handleSave} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs font-medium tracking-wide text-[#59616B]">ENQUIRY STATUS</span>
                <select value={status} onChange={e => { setStatus(e.target.value); setSaved(false); }} className="w-full rounded-lg border border-[#E9E4D9] bg-white px-3 py-3 text-sm outline-none focus:border-[#B18A45]">
                  {statuses.map(item => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-medium tracking-wide text-[#59616B]">INTERNAL ADMIN NOTES</span>
                <textarea value={notes} onChange={e => { setNotes(e.target.value); setSaved(false); }} rows={6} placeholder="Add notes visible only to administrators..." className="w-full resize-y rounded-lg border border-[#E9E4D9] bg-white px-3 py-3 text-sm leading-6 outline-none placeholder:text-[#A5A7A8] focus:border-[#B18A45]" />
                <span className="mt-1 block text-xs text-[#92979D]">These notes are not shared with the customer.</span>
              </label>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#182333] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#B18A45]">
                <Save size={16} /> Save Changes
              </button>
              {saved && <p role="status" className="text-center text-xs text-emerald-700">Changes saved in this preview.</p>}
            </form>
          </InfoCard>

          <InfoCard title="Quick Contact" icon={Mail}>
            <div className="space-y-3">
              <a href={`mailto:${initial.email}`} className="flex items-center justify-center gap-2 rounded-lg border border-[#E9E4D9] px-4 py-3 text-sm text-[#182333] transition hover:border-[#B18A45] hover:text-[#A17B3F]"><Mail size={16}/> Email Guest</a>
              <a href={`tel:${initial.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 rounded-lg border border-[#E9E4D9] px-4 py-3 text-sm text-[#182333] transition hover:border-[#B18A45] hover:text-[#A17B3F]"><Phone size={16}/> Call Guest</a>
            </div>
          </InfoCard>

          <div className="rounded-xl border border-[#E9E4D9] bg-[#F4F1EA] p-5">
            <div className="flex items-center gap-2 text-[#A17B3F]"><CheckCircle2 size={17}/><p className="text-xs font-semibold tracking-wide">ADMIN REMINDER</p></div>
            <p className="mt-2 text-sm leading-6 text-[#59616B]">Update the enquiry status after contacting the guest so the dashboard reflects the latest progress.</p>
          </div>
        </aside>
      </div>
    </AdminLayout>
  );
}
