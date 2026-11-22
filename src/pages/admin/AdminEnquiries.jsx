import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Inbox, Sparkles, Clock3, CircleCheck, Archive, Search,
  ChevronDown, Eye, Trash2, X, CalendarDays
} from "lucide-react";
import AdminLayout from "./AdminLayout";

const initialEnquiries = [
  { id: "HE-1180", name: "Arjun Mehta", email: "arjun.mehta@gmail.com", phone: "+91 98765 43210", hotel: "The Oberoi Udaivilas", destination: "Udaipur", checkIn: "13 Dec 2026", checkOut: "16 Dec 2026", guests: 2, rooms: 1, status: "New", submitted: "22 Nov 2026" },
  { id: "HE-1181", name: "Priya Sharma", email: "priya.sharma@outlook.com", phone: "+91 98201 45632", hotel: "Taj Lake Palace", destination: "Udaipur", checkIn: "26 Dec 2026", checkOut: "29 Dec 2026", guests: 3, rooms: 2, status: "Pending", submitted: "22 Nov 2026" },
  { id: "HE-1182", name: "Rohan Kapoor", email: "rohan.kapoor@yahoo.com", phone: "+91 99100 22114", hotel: "Wildflower Hall", destination: "Shimla", checkIn: "01 Dec 2026", checkOut: "06 Dec 2026", guests: 2, rooms: 1, status: "Confirmed", submitted: "21 Nov 2026" },
  { id: "HE-1183", name: "Sarah Mitchell", email: "sarah.mitchell@gmail.com", phone: "+44 7700 900345", hotel: "Taj Exotica Resort & Spa", destination: "Benaulim, South Goa", checkIn: "01 Jan 2027", checkOut: "08 Jan 2027", guests: 4, rooms: 2, status: "New", submitted: "21 Nov 2026" },
  { id: "HE-1184", name: "Vikram Singhania", email: "vikram.s@singhaniaind.com", phone: "+91 98111 77889", hotel: "Rambagh Palace", destination: "Jaipur", checkIn: "10 Jan 2027", checkOut: "13 Jan 2027", guests: 2, rooms: 1, status: "Pending", submitted: "20 Nov 2026" },
  { id: "HE-1185", name: "Emily Chen", email: "emily.chen@gmail.com", phone: "+65 8123 4567", hotel: "Taj Lake Palace", destination: "Udaipur", checkIn: "18 Jan 2027", checkOut: "22 Jan 2027", guests: 2, rooms: 1, status: "Contacted", submitted: "20 Nov 2026" },
  { id: "HE-1186", name: "Kabir Malhotra", email: "kabir.m@gmail.com", phone: "+91 98990 12345", hotel: "The Tamara Coorg", destination: "Coorg", checkIn: "05 Feb 2027", checkOut: "09 Feb 2027", guests: 5, rooms: 2, status: "Closed", submitted: "19 Nov 2026" },
  { id: "HE-1187", name: "Ananya Rao", email: "ananya.rao@gmail.com", phone: "+91 98450 11223", hotel: "Wildflower Hall", destination: "Shimla", checkIn: "12 Feb 2027", checkOut: "15 Feb 2027", guests: 2, rooms: 1, status: "Cancelled", submitted: "18 Nov 2026" },
];

const statusStyles = {
  New: "bg-blue-50 text-blue-700 border-blue-100",
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Contacted: "bg-violet-50 text-violet-700 border-violet-100",
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Cancelled: "bg-red-50 text-red-700 border-red-100",
  Closed: "bg-slate-100 text-slate-600 border-slate-200",
};

function StatusBadge({ status }) {
  return <span className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${statusStyles[status] || statusStyles.Closed}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>;
}

function StatCard({ label, value, Icon, iconClass }) {
  return <article className="flex items-center justify-between rounded-xl border border-[#E9E4D9] bg-white p-5 shadow-[0_3px_12px_rgba(24,35,51,0.03)]">
    <div><p className="text-[11px] font-medium tracking-[1px] text-[#737A82]">{label}</p><p className="mt-2 font-serif text-3xl text-[#182333]">{value}</p></div>
    <span className={`rounded-xl p-3 ${iconClass}`}><Icon size={22}/></span>
  </article>;
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [destination, setDestination] = useState("All Destinations");
  const [hotel, setHotel] = useState("All Hotels");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const destinations = [...new Set(initialEnquiries.map(item => item.destination))];
  const hotels = [...new Set(initialEnquiries.map(item => item.hotel))];

  const filtered = useMemo(() => enquiries.filter(item => {
    const query = search.toLowerCase();
    const matchesSearch = [item.id, item.name, item.email, item.phone, item.hotel].some(value => value.toLowerCase().includes(query));
    const matchesStatus = status === "All Statuses" || item.status === status;
    const matchesDestination = destination === "All Destinations" || item.destination === destination;
    const matchesHotel = hotel === "All Hotels" || item.hotel === hotel;
    const submitted = new Date(item.submitted);
    const matchesFrom = !fromDate || submitted >= new Date(fromDate);
    const matchesTo = !toDate || submitted <= new Date(toDate);
    return matchesSearch && matchesStatus && matchesDestination && matchesHotel && matchesFrom && matchesTo;
  }), [enquiries, search, status, destination, hotel, fromDate, toDate]);

  const counts = {
    total: enquiries.length,
    new: enquiries.filter(x => x.status === "New").length,
    pending: enquiries.filter(x => x.status === "Pending").length,
    confirmed: enquiries.filter(x => x.status === "Confirmed").length,
    closed: enquiries.filter(x => x.status === "Closed").length,
  };

  const updateStatus = (id, nextStatus) => setEnquiries(current => current.map(item => item.id === id ? { ...item, status: nextStatus } : item));
  const removeEnquiry = () => {
    setEnquiries(current => current.filter(item => item.id !== deleteTarget));
    setDeleteTarget(null);
  };

  return <AdminLayout>
    <div className="mb-7">
      <h2 className="font-serif text-3xl text-[#182333]">Enquiries</h2>
      <p className="mt-1 text-sm text-[#737A82] sm:text-base">Every enquiry submitted through the public website, with status workflows.</p>
    </div>

    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard label="TOTAL ENQUIRIES" value={counts.total} Icon={Inbox} iconClass="bg-slate-100 text-[#182333]"/>
      <StatCard label="NEW" value={counts.new} Icon={Sparkles} iconClass="bg-blue-50 text-blue-600"/>
      <StatCard label="PENDING" value={counts.pending} Icon={Clock3} iconClass="bg-amber-50 text-amber-600"/>
      <StatCard label="CONFIRMED" value={counts.confirmed} Icon={CircleCheck} iconClass="bg-emerald-50 text-emerald-600"/>
      <StatCard label="CLOSED" value={counts.closed} Icon={Archive} iconClass="bg-slate-100 text-slate-500"/>
    </section>

    <section className="mt-7 rounded-xl border border-[#E9E4D9] bg-white p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(230px,1.4fr)_minmax(150px,.8fr)_minmax(180px,1fr)_minmax(190px,1fr)]">
        <label className="flex items-center gap-2 rounded-lg border border-[#E9E4D9] px-3 py-2.5">
          <Search size={17} className="shrink-0 text-[#737A82]"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or enquiry ID..." className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[#92979D]"/>
        </label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="rounded-lg border border-[#E9E4D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#B18A45]">
          {["All Statuses","New","Pending","Contacted","Confirmed","Cancelled","Closed"].map(x => <option key={x}>{x}</option>)}
        </select>
        <select value={destination} onChange={e => setDestination(e.target.value)} className="rounded-lg border border-[#E9E4D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#B18A45]">
          <option>All Destinations</option>{destinations.map(x => <option key={x}>{x}</option>)}
        </select>
        <select value={hotel} onChange={e => setHotel(e.target.value)} className="rounded-lg border border-[#E9E4D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#B18A45]">
          <option>All Hotels</option>{hotels.map(x => <option key={x}>{x}</option>)}
        </select>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[#737A82]">
        <CalendarDays size={16}/>
        <span>Submitted between</span>
        <input aria-label="From date" type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="rounded-lg border border-[#E9E4D9] px-3 py-2 text-sm text-[#182333] outline-none focus:border-[#B18A45]"/>
        <span>and</span>
        <input aria-label="To date" type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="rounded-lg border border-[#E9E4D9] px-3 py-2 text-sm text-[#182333] outline-none focus:border-[#B18A45]"/>
        <button onClick={() => {setSearch("");setStatus("All Statuses");setDestination("All Destinations");setHotel("All Hotels");setFromDate("");setToDate("");}} className="ml-auto text-xs text-[#A17B3F] hover:text-[#182333]">Clear filters</button>
      </div>
    </section>

    <section className="mt-7 overflow-hidden rounded-xl border border-[#E9E4D9] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E9E4D9] p-5">
        <div><h3 className="font-serif text-xl">All Enquiries</h3><p className="mt-1 text-sm text-[#737A82]">Showing {filtered.length} of {enquiries.length} enquiries</p></div>
        <label className="flex items-center gap-2 text-sm text-[#737A82]">Rows per page
          <select value={rowsPerPage} onChange={e => setRowsPerPage(e.target.value)} className="rounded-lg border border-[#E9E4D9] bg-white px-3 py-2 text-[#182333] outline-none"><option>10</option><option>25</option><option>50</option></select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1350px] text-left text-sm">
          <thead className="border-b border-[#E9E4D9] text-[11px] tracking-[.6px] text-[#737A82]">
            <tr>{["ENQUIRY ID","CUSTOMER NAME","EMAIL","PHONE","HOTEL OF INTEREST","DESTINATION","CHECK-IN","CHECK-OUT","GUESTS","ROOMS","STATUS","SUBMITTED","ACTIONS"].map(h => <th key={h} className="whitespace-nowrap px-3 py-4 font-medium first:pl-5">{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.slice(0, Number(rowsPerPage)).map(item => <tr key={item.id} className="border-b border-[#E9E4D9] transition hover:bg-[#FDFBF7]">
              <td className="whitespace-nowrap px-3 py-4 pl-5 font-medium text-[#B18A45]">{item.id}</td>
              <td className="whitespace-nowrap px-3 py-4 font-medium">{item.name}</td>
              <td className="whitespace-nowrap px-3 py-4 text-[#737A82]">{item.email}</td>
              <td className="whitespace-nowrap px-3 py-4">{item.phone}</td>
              <td className="whitespace-nowrap px-3 py-4">{item.hotel}</td>
              <td className="whitespace-nowrap px-3 py-4">{item.destination}</td>
              <td className="whitespace-nowrap px-3 py-4">{item.checkIn}</td>
              <td className="whitespace-nowrap px-3 py-4">{item.checkOut}</td>
              <td className="px-3 py-4">{item.guests}</td>
              <td className="px-3 py-4">{item.rooms}</td>
              <td className="px-3 py-4">
                <select aria-label={`Change status for ${item.id}`} value={item.status} onChange={e => updateStatus(item.id, e.target.value)} className={`rounded-full border px-2 py-1 text-xs outline-none ${statusStyles[item.status]}`}>
                  {["New","Pending","Contacted","Confirmed","Cancelled","Closed"].map(s => <option key={s}>{s}</option>)}
                </select>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-[#737A82]">{item.submitted}</td>
              <td className="px-3 py-4"><div className="flex items-center gap-2">
                <Link to={`/admin/enquiries/${item.id}`} title="View details" className="rounded-md p-2 text-[#737A82] hover:bg-[#F4F1EA] hover:text-[#182333]"><Eye size={16}/></Link>
                <button title="Delete enquiry" onClick={() => setDeleteTarget(item.id)} className="rounded-md p-2 text-[#737A82] hover:bg-red-50 hover:text-red-600"><Trash2 size={16}/></button>
              </div></td>
            </tr>)}
            {filtered.length === 0 && <tr><td colSpan="13" className="px-6 py-16 text-center"><Inbox className="mx-auto mb-3 text-[#B18A45]" size={30}/><p className="font-medium">No enquiries found</p><p className="mt-1 text-sm text-[#737A82]">Try changing your search or filters.</p></td></tr>}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E9E4D9] px-5 py-4 text-xs text-[#737A82]">
        <span>Showing {filtered.length ? 1 : 0}–{Math.min(filtered.length, Number(rowsPerPage))} of {filtered.length} results</span>
        <div className="flex items-center gap-2"><button disabled className="rounded-lg border border-[#E9E4D9] px-3 py-2 opacity-50">Previous</button><span className="rounded-lg bg-[#182333] px-3 py-2 text-white">1</span><button disabled className="rounded-lg border border-[#E9E4D9] px-3 py-2 opacity-50">Next</button></div>
      </div>
    </section>

    {deleteTarget && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#182333]/45 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between"><div><h3 className="font-serif text-2xl">Delete enquiry?</h3><p className="mt-2 text-sm leading-6 text-[#737A82]">This will remove enquiry {deleteTarget} from this temporary view. This action cannot be undone.</p></div><button onClick={() => setDeleteTarget(null)} className="rounded-lg p-2 hover:bg-[#F4F1EA]"><X size={18}/></button></div>
        <div className="mt-6 flex justify-end gap-3"><button onClick={() => setDeleteTarget(null)} className="rounded-lg border border-[#E9E4D9] px-4 py-2.5 text-sm">Cancel</button><button onClick={removeEnquiry} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm text-white hover:bg-red-700">Delete Enquiry</button></div>
      </div>
    </div>}
  </AdminLayout>;
}
