import React from "react";
import {
  Building2,
  Inbox,
  Clock3,
  CircleCheck,
  TrendingUp,
  Plus,
  ArrowRight,
  RefreshCw,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";

// Temporary frontend data. Replace with API data during backend integration.
const recentEnquiries = [
  { id: "HE-1180", name: "Arjun Mehta", email: "arjun.mehta@gmail.com", destination: "Udaipur", hotel: "The Oberoi Udaivilas", status: "New" },
  { id: "HE-1181", name: "Priya Sharma", email: "priya.sharma@outlook.com", destination: "Udaipur", hotel: "Taj Lake Palace", status: "Pending" },
  { id: "HE-1182", name: "Rohan Kapoor", email: "rohan.kapoor@yahoo.com", destination: "Shimla", hotel: "Wildflower Hall", status: "Confirmed" },
  { id: "HE-1183", name: "Sarah Mitchell", email: "sarah.mitchell@gmail.com", destination: "Benaulim, South Goa", hotel: "Taj Exotica Resort & Spa", status: "New" },
  { id: "HE-1184", name: "Vikram Singhania", email: "vikram.s@singhaniaind.com", destination: "Jaipur", hotel: "Rambagh Palace", status: "Pending" },
];

const activities = [
  { text: "New enquiry from Sarah Mitchell for Taj Exotica Resort & Spa", time: "about 4 hours ago", Icon: Inbox, tone: "blue" },
  { text: "Enquiry HE-1182 marked Confirmed", time: "about 6 hours ago", Icon: RefreshCw, tone: "green" },
  { text: "Wildflower Hall — winter rates and gallery updated", time: "about 20 hours ago", Icon: Pencil, tone: "purple" },
  { text: "New enquiry from Emily Chen for Taj Lake Palace", time: "1 day ago", Icon: Inbox, tone: "blue" },
  { text: "The Tamara Coorg added to hotel inventory", time: "2 days ago", Icon: Plus, tone: "gold" },
];

const stats = [
  { label: "TOTAL HOTELS", value: "12", note: "9 active & published · 4 featured", Icon: Building2, color: "text-[#B18A45]", bg: "bg-[#F6F2EA]", trend: "+8%" },
  { label: "TOTAL ENQUIRIES", value: "22", note: "21 received this month", Icon: Inbox, color: "text-[#182333]", bg: "bg-slate-100", trend: "+12%" },
  { label: "PENDING ENQUIRIES", value: "5", note: "Awaiting your action", Icon: Clock3, color: "text-orange-600", bg: "bg-orange-50", trend: "−3%" },
  { label: "CONFIRMED ENQUIRIES", value: "4", note: "Bookings locked in", Icon: CircleCheck, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+5%" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="mb-7">
        <h2 className="font-serif text-3xl text-[#182333]">Welcome back, Aarav</h2>
        <p className="mt-1 text-sm text-[#737A82] sm:text-base">Here's what's happening across HotelEnquiry today.</p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {stats.map(({ label, value, note, Icon, color, bg, trend }, index) => (
          <article key={label} className="rounded-xl border border-[#E9E4D9] bg-white p-5 shadow-[0_3px_12px_rgba(24,35,51,0.03)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-medium tracking-[1px] text-[#737A82]">{label}</span>
              <span className={`rounded-xl p-3 ${bg} ${color}`}><Icon size={22} /></span>
            </div>
            <p className="mt-2 font-serif text-4xl text-[#182333]">{value}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2 py-1 text-[11px] font-medium ${index === 2 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"}`}>
                <TrendingUp className="mr-1 inline" size={12} />{trend}
              </span>
              <span className="text-xs text-[#737A82]">{note}</span>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-7 grid grid-cols-1 gap-6 2xl:grid-cols-[1.8fr_1fr]">
        <section className="min-w-0 overflow-hidden rounded-xl border border-[#E9E4D9] bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-[#E9E4D9] p-5">
            <div>
              <h3 className="font-serif text-xl text-[#182333]">Recent Enquiries</h3>
              <p className="mt-1 text-sm text-[#737A82]">Latest guest requests submitted through the website.</p>
            </div>
            <Link to="/admin/enquiries" className="shrink-0 rounded-lg bg-[#FDFBF7] px-3 py-2 text-sm transition hover:bg-[#F4F1EA]">View All</Link>
          </div>
          <div className="overflow-x-auto p-4">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-[11px] tracking-[.7px] text-[#737A82]"><tr>
                {["ENQUIRY ID", "CUSTOMER NAME", "EMAIL", "DESTINATION", "HOTEL", "STATUS"].map((heading) => <th key={heading} className="whitespace-nowrap px-3 py-4 font-medium">{heading}</th>)}
              </tr></thead>
              <tbody>{recentEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="border-t border-[#E9E4D9] hover:bg-[#FDFBF7]">
                  <td className="whitespace-nowrap px-3 py-4 text-[#B18A45]">{enquiry.id}</td>
                  <td className="whitespace-nowrap px-3 py-4 font-medium">{enquiry.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-[#737A82]">{enquiry.email}</td>
                  <td className="whitespace-nowrap px-3 py-4">{enquiry.destination}</td>
                  <td className="whitespace-nowrap px-3 py-4">{enquiry.hotel}</td>
                  <td className="px-3 py-4"><StatusBadge status={enquiry.status} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-[#E9E4D9] bg-white">
          <div className="border-b border-[#E9E4D9] p-5">
            <h3 className="font-serif text-xl text-[#182333]">Recent Activity</h3>
            <p className="mt-1 text-sm text-[#737A82]">Administrator actions across the platform.</p>
          </div>
          <div className="space-y-5 p-5">
            {activities.map(({ text, time, Icon, tone }) => (
              <div className="flex gap-3" key={text}>
                <span className={`mt-0.5 shrink-0 rounded-full p-2 ${tone === "green" ? "bg-emerald-50 text-emerald-600" : tone === "purple" ? "bg-purple-50 text-purple-600" : tone === "gold" ? "bg-[#F6F2EA] text-[#B18A45]" : "bg-blue-50 text-blue-600"}`}><Icon size={17} /></span>
                <div className="min-w-0"><p className="text-sm leading-5 text-[#182333]">{text}</p><p className="mt-1 text-xs text-[#92979D]">{time}</p></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/admin/hotels/new" className="inline-flex items-center gap-2 rounded-lg bg-[#182333] px-4 py-3 text-sm text-white transition hover:bg-[#B18A45]"><Plus size={16} />Add New Hotel</Link>
        <Link to="/admin/enquiries" className="inline-flex items-center gap-2 rounded-lg border border-[#E9E4D9] bg-white px-4 py-3 text-sm transition hover:bg-[#F4F1EA]">Manage Enquiries <ArrowRight size={16} /></Link>
      </div>
    </AdminLayout>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    New: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    Contacted: "bg-purple-50 text-purple-700",
    Confirmed: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-red-50 text-red-700",
    Closed: "bg-slate-100 text-slate-600",
  };
  return <span className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-full px-3 py-1 text-xs ${styles[status] || "bg-slate-100 text-slate-600"}`}><span>●</span>{status}</span>;
}
