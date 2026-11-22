import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus, Search, Building2, CloudUpload, FileEdit, Star,
  MoreHorizontal, MapPin, Pencil, Eye, Trash2, X
} from "lucide-react";
import AdminLayout from "./AdminLayout";

// Temporary frontend sample data. Replace with API data during backend integration.
const initialHotels = [
  { id: 1, name: "The Oberoi Udaivilas", slug: "the-oberoi-udaivilas", city: "Udaipur", state: "Rajasthan", category: "Heritage", price: 45000, status: "Published", featured: true, updated: "22 Nov 2026", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=160&auto=format&fit=crop" },
  { id: 2, name: "Taj Lake Palace", slug: "taj-lake-palace", city: "Udaipur", state: "Rajasthan", category: "Heritage", price: 38000, status: "Published", featured: true, updated: "21 Nov 2026", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=160&auto=format&fit=crop" },
  { id: 3, name: "Rambagh Palace", slug: "rambagh-palace", city: "Jaipur", state: "Rajasthan", category: "Heritage", price: 40000, status: "Published", featured: true, updated: "20 Nov 2026", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=160&auto=format&fit=crop" },
  { id: 4, name: "Wildflower Hall", slug: "wildflower-hall", city: "Shimla", state: "Himachal Pradesh", category: "Mountain", price: 32000, status: "Published", featured: true, updated: "19 Nov 2026", image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=160&auto=format&fit=crop" },
  { id: 5, name: "Taj Exotica Resort & Spa", slug: "taj-exotica-resort-spa", city: "Benaulim", state: "Goa", category: "Coastal", price: 29000, status: "Draft", featured: false, updated: "18 Nov 2026", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=160&auto=format&fit=crop" },
  { id: 6, name: "The Tamara Coorg", slug: "the-tamara-coorg", city: "Madikeri", state: "Karnataka", category: "Mountain", price: 26000, status: "Draft", featured: false, updated: "17 Nov 2026", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=160&auto=format&fit=crop" },
];

function StatusBadge({ status }) {
  const styles = status === "Published"
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-amber-50 text-amber-700 border-amber-200";
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${styles}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>;
}

function StatCard({ label, value, icon: Icon, tone = "gold" }) {
  const toneClass = tone === "green" ? "bg-emerald-50 text-emerald-600" : tone === "amber" ? "bg-amber-50 text-amber-600" : tone === "slate" ? "bg-slate-100 text-[#182333]" : "bg-[#F6F2EA] text-[#B18A45]";
  return <div className="flex items-center justify-between rounded-xl border border-[#E9E4D9] bg-white p-5 shadow-sm sm:p-6"><div><p className="text-xs tracking-[1px] text-[#737A82]">{label}</p><p className="mt-2 font-serif text-3xl text-[#182333]">{value}</p></div><span className={`rounded-xl p-3 ${toneClass}`}><Icon size={22} /></span></div>;
}

export default function AdminHotels() {
  const [hotels, setHotels] = useState(initialHotels);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [menuId, setMenuId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const states = [...new Set(hotels.map((hotel) => hotel.state))].sort();
  const cities = [...new Set(hotels.filter((hotel) => stateFilter === "All States" || hotel.state === stateFilter).map((hotel) => hotel.city))].sort();
  const filteredHotels = useMemo(() => hotels.filter((hotel) => {
    const query = search.toLowerCase();
    return (hotel.name.toLowerCase().includes(query) || hotel.city.toLowerCase().includes(query) || hotel.slug.includes(query))
      && (stateFilter === "All States" || hotel.state === stateFilter)
      && (cityFilter === "All Cities" || hotel.city === cityFilter)
      && (categoryFilter === "All Categories" || hotel.category === categoryFilter)
      && (statusFilter === "All Statuses" || hotel.status === statusFilter);
  }), [hotels, search, stateFilter, cityFilter, categoryFilter, statusFilter]);

  const publishedCount = hotels.filter((hotel) => hotel.status === "Published").length;
  const draftCount = hotels.filter((hotel) => hotel.status === "Draft").length;
  const featuredCount = hotels.filter((hotel) => hotel.featured).length;

  const toggleFeatured = (id) => setHotels((current) => current.map((hotel) => hotel.id === id ? { ...hotel, featured: !hotel.featured } : hotel));
  const toggleStatus = (id) => setHotels((current) => current.map((hotel) => hotel.id === id ? { ...hotel, status: hotel.status === "Published" ? "Draft" : "Published" } : hotel));
  const confirmDelete = () => { setHotels((current) => current.filter((hotel) => hotel.id !== deleteId)); setDeleteId(null); };

  return (
    <AdminLayout>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><h2 className="font-serif text-3xl text-[#182333]">Manage Hotels</h2><p className="mt-1 text-sm text-[#737A82] sm:text-base">Add, update and manage hotels listed on HotelEnquiry.</p></div>
        <Link to="/admin/hotels/new" className="inline-flex items-center gap-2 rounded-lg bg-[#182333] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#B18A45]"><Plus size={17} /> Add New Hotel</Link>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        <StatCard label="TOTAL HOTELS" value={hotels.length} icon={Building2} />
        <StatCard label="PUBLISHED" value={publishedCount} icon={CloudUpload} tone="green" />
        <StatCard label="DRAFT" value={draftCount} icon={FileEdit} tone="amber" />
        <StatCard label="FEATURED" value={featuredCount} icon={Star} />
      </div>

      <section className="mb-6 rounded-xl border border-[#E9E4D9] bg-white p-4">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <label className="flex min-w-0 items-center gap-2 rounded-lg border border-[#E9E4D9] px-3"><Search size={17} className="shrink-0 text-[#737A82]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by hotel name..." className="w-full py-2.5 text-sm outline-none" /></label>
          <select value={stateFilter} onChange={(event) => { setStateFilter(event.target.value); setCityFilter("All Cities"); }} className="rounded-lg border border-[#E9E4D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#B18A45]"><option>All States</option>{states.map((state) => <option key={state}>{state}</option>)}</select>
          <select value={cityFilter} onChange={(event) => setCityFilter(event.target.value)} className="rounded-lg border border-[#E9E4D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#B18A45]"><option>All Cities</option>{cities.map((city) => <option key={city}>{city}</option>)}</select>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-lg border border-[#E9E4D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#B18A45]"><option>All Categories</option><option>Mountain</option><option>Coastal</option><option>Heritage</option></select>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border border-[#E9E4D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#B18A45]"><option>All Statuses</option><option>Published</option><option>Draft</option></select>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-[#E9E4D9] bg-white">
        <div className="border-b border-[#E9E4D9] p-5"><h3 className="font-serif text-xl">All Hotels</h3><p className="mt-1 text-sm text-[#737A82]">Showing {filteredHotels.length} of {hotels.length} hotels</p></div>
        <div className="overflow-x-auto p-4">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="text-xs tracking-wide text-[#737A82]"><tr>{["HOTEL", "LOCATION", "CATEGORY", "STARTING PRICE", "STATUS", "FEATURED", "LAST UPDATED", "ACTIONS"].map((heading) => <th key={heading} className="px-3 py-4 font-medium">{heading}</th>)}</tr></thead>
            <tbody>{filteredHotels.map((hotel) => <tr key={hotel.id} className="border-t border-[#E9E4D9] transition hover:bg-[#FDFBF7]">
              <td className="px-3 py-3"><div className="flex items-center gap-3"><img src={hotel.image} alt={hotel.name} className="h-12 w-14 rounded-lg object-cover" /><div><p className="font-medium text-[#182333]">{hotel.name}</p><p className="text-xs text-[#92979D]">{hotel.slug}</p></div></div></td>
              <td className="px-3 py-4 text-[#737A82]"><span className="inline-flex items-center gap-1"><MapPin size={13} />{hotel.city}, {hotel.state}</span></td>
              <td className="px-3 py-4">{hotel.category}</td><td className="px-3 py-4 font-medium">₹{hotel.price.toLocaleString("en-IN")}</td><td className="px-3 py-4"><StatusBadge status={hotel.status} /></td>
              <td className="px-3 py-4"><button onClick={() => toggleFeatured(hotel.id)} aria-label={hotel.featured ? "Remove from featured" : "Mark as featured"} className={`text-xl transition hover:scale-110 ${hotel.featured ? "text-[#B18A45]" : "text-slate-300"}`}>★</button></td>
              <td className="px-3 py-4 text-[#737A82]">{hotel.updated}</td>
              <td className="relative px-3 py-4"><button onClick={() => setMenuId(menuId === hotel.id ? null : hotel.id)} aria-label="Hotel actions" className="rounded-md p-2 hover:bg-[#F4F1EA]"><MoreHorizontal size={19} /></button>{menuId === hotel.id && <div className="absolute right-5 top-12 z-10 w-44 rounded-lg border border-[#E9E4D9] bg-white p-1 shadow-lg"><Link to={`/admin/hotels/${hotel.id}`} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-[#F4F1EA]"><Eye size={15} /> View</Link><Link to={`/admin/hotels/${hotel.id}/edit`} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-[#F4F1EA]"><Pencil size={15} /> Edit</Link><button onClick={() => { toggleStatus(hotel.id); setMenuId(null); }} className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-[#F4F1EA]">{hotel.status === "Published" ? "Save as draft" : "Publish hotel"}</button><button onClick={() => { setDeleteId(hotel.id); setMenuId(null); }} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"><Trash2 size={15} /> Delete</button></div>}</td>
            </tr>)}</tbody>
          </table>
          {filteredHotels.length === 0 && <div className="py-14 text-center text-sm text-[#737A82]">No hotels match your filters.</div>}
        </div>
      </section>

      {deleteId !== null && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#182333]/40 p-4"><div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"><div className="flex items-start justify-between"><h3 className="font-serif text-xl">Delete hotel?</h3><button onClick={() => setDeleteId(null)} aria-label="Close"><X size={19} /></button></div><p className="mt-3 text-sm leading-6 text-[#737A82]">This will remove the hotel from this sample list. You can connect this action to the backend later.</p><div className="mt-6 flex justify-end gap-3"><button onClick={() => setDeleteId(null)} className="rounded-lg border border-[#E9E4D9] px-4 py-2 text-sm">Cancel</button><button onClick={confirmDelete} className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">Delete</button></div></div></div>}
    </AdminLayout>
  );
}
