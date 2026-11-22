import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, FileText, ImagePlus, Plus, Save, X } from "lucide-react";
import AdminLayout from "./AdminLayout";

const amenityOptions = [
  "Free Wi-Fi", "Swimming Pool", "Restaurant", "Parking", "Spa", "Gym",
  "Air Conditioning", "Room Service", "Airport Transfer", "Conference Facilities",
];

const stateCityMap = {
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
  Goa: ["Benaulim", "Candolim", "Calangute", "Panaji"],
  "Uttar Pradesh": ["Agra", "Varanasi", "Lucknow"],
  Uttarakhand: ["Dehradun", "Mussoorie", "Nainital"],
  Karnataka: ["Bengaluru", "Coorg", "Mysuru"],
  "Jammu & Kashmir": ["Srinagar", "Gulmarg", "Pahalgam"],
  Kerala: ["Kochi", "Munnar", "Alleppey"],
};

const emptyHotel = {
  name: "", slug: "", shortDescription: "", description: "", country: "India",
  state: "", city: "", address: "", postalCode: "", mapUrl: "", category: "Heritage",
  price: "", rating: "5 Stars", checkIn: "14:00", checkOut: "11:00", email: "", phone: "", website: "",
  coverImage: "", gallery: [], amenities: [], featured: false, status: "Draft", seoTitle: "", seoDescription: "",
};

function Field({ label, required, hint, children, className = "" }) {
  return <label className={`block min-w-0 ${className}`}><span className="mb-2 block text-sm font-medium text-[#182333]">{label}{required && <span className="ml-1 text-red-500">*</span>}</span>{children}{hint && <span className="mt-1.5 block text-xs text-[#8A9097]">{hint}</span>}</label>;
}

const inputClass = "w-full rounded-lg border border-[#E9E4D9] bg-white px-3 py-2.5 text-sm text-[#182333] outline-none transition placeholder:text-[#A5A7A8] focus:border-[#B18A45] focus:ring-2 focus:ring-[#B18A45]/10";
const textareaClass = `${inputClass} min-h-[104px] resize-y leading-6`;

export default function AdminHotelForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(emptyHotel);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  // Temporary frontend-only edit example. Replace with API data during backend integration.
  useEffect(() => {
    if (isEdit) {
      setForm({ ...emptyHotel, name: "The Oberoi Udaivilas", slug: "the-oberoi-udaivilas", shortDescription: "Lakeside palace retreat with reflecting pools and butler service.", description: "A luxurious lakeside palace retreat in Udaipur, known for its traditional architecture, exceptional dining and personalized hospitality.", state: "Rajasthan", city: "Udaipur", address: "Haridasji Ki Magri, Udaipur, Rajasthan", postalCode: "313001", category: "Heritage", price: "45000", email: "reservations@oberoihotels.com", phone: "+91 294 242 8800", featured: true, status: "Published", amenities: ["Free Wi-Fi", "Swimming Pool", "Restaurant", "Spa", "Room Service"] });
    }
  }, [isEdit]);

  const cities = useMemo(() => stateCityMap[form.state] || [], [form.state]);
  const update = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  const handleNameChange = (value) => {
    setForm((current) => ({ ...current, name: value, slug: current.slug || value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }));
  };

  const toggleAmenity = (amenity) => setForm((current) => ({
    ...current,
    amenities: current.amenities.includes(amenity)
      ? current.amenities.filter((item) => item !== amenity)
      : [...current.amenities, amenity],
  }));

  const handleImage = (event, field, multiple = false) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const urls = files.map((file) => URL.createObjectURL(file));
    if (multiple) update(field, [...form.gallery, ...urls]);
    else update(field, urls[0]);
    event.target.value = "";
  };

  const validate = () => {
    const next = {};
    ["name", "slug", "state", "city", "category", "price", "email"].forEach((key) => {
      if (!String(form[key] || "").trim()) next[key] = "This field is required.";
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.price && Number(form.price) < 0) next.price = "Price cannot be negative.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event, status) => {
    event.preventDefault();
    if (!validate()) return;
    update("status", status);
    setNotice(status === "Published" ? "Hotel is ready to publish. Backend integration will save this record." : "Hotel draft is ready. Backend integration will save this record.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeGalleryImage = (index) => update("gallery", form.gallery.filter((_, i) => i !== index));

  return (
    <AdminLayout>
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link to="/admin/hotels" className="mb-4 inline-flex items-center gap-2 text-sm text-[#737A82] transition hover:text-[#B18A45]"><ArrowLeft size={17} /> Back to Hotels</Link>
            <h2 className="font-serif text-3xl text-[#182333]">{isEdit ? "Edit Hotel" : "Add New Hotel"}</h2>
            <p className="mt-1 text-sm text-[#737A82] sm:text-base">{isEdit ? "Update this property's information and listing details." : "List a new property on HotelEnquiry across six tidy sections."}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => navigate("/admin/hotels")} className="px-3 py-2.5 text-sm text-[#737A82] hover:text-[#182333]">Cancel</button>
            <button type="button" onClick={(e) => handleSubmit(e, "Draft")} className="inline-flex items-center gap-2 rounded-lg border border-[#E9E4D9] bg-white px-4 py-2.5 text-sm hover:bg-[#F4F1EA]"><FileText size={16} /> Save as Draft</button>
            <button type="button" onClick={(e) => handleSubmit(e, "Published")} className="inline-flex items-center gap-2 rounded-lg bg-[#182333] px-4 py-2.5 text-sm text-white transition hover:bg-[#B18A45]"><Check size={16} /> {isEdit ? "Save Changes" : "Publish Hotel"}</button>
          </div>
        </div>

        {notice && <div role="status" className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss"><X size={16}/></button></div>}

        <form onSubmit={(e) => handleSubmit(e, form.status)} className="space-y-6">
          {/* Basic information */}
          <section className="rounded-2xl border border-[#E9E4D9] bg-white p-5 sm:p-6">
            <h3 className="font-serif text-xl text-[#182333]">Basic Information</h3>
            <p className="mt-1 text-sm text-[#737A82]">The essentials guests see first.</p>
            <div className="mt-5 grid gap-x-6 gap-y-5 md:grid-cols-2">
              <Field label="Hotel Name" required><input className={inputClass} value={form.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g. The Oberoi Udaivilas" />{errors.name && <small className="text-red-600">{errors.name}</small>}</Field>
              <Field label="Slug" required hint="Auto-generated from the hotel name — edit if needed."><input className={inputClass} value={form.slug} onChange={(e) => update("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} placeholder="the-oberoi-udaivilas" />{errors.slug && <small className="text-red-600">{errors.slug}</small>}</Field>
              <Field label="Short Description" hint="One or two lines for cards and search results."><textarea className={textareaClass} value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} placeholder="Lakeside palace retreat with reflecting pools and butler service..." /></Field>
              <Field label="Full Description"><textarea className={textareaClass} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="The complete story of the property — setting, dining, experiences..." /></Field>
            </div>
          </section>

          {/* Location */}
          <section className="rounded-2xl border border-[#E9E4D9] bg-white p-5 sm:p-6">
            <h3 className="font-serif text-xl text-[#182333]">Location</h3>
            <p className="mt-1 text-sm text-[#737A82]">Where guests will find the property.</p>
            <div className="mt-5 grid gap-x-6 gap-y-5 md:grid-cols-2">
              <Field label="Country"><input className={inputClass} value={form.country} onChange={(e) => update("country", e.target.value)} /></Field>
              <Field label="State" required><select className={inputClass} value={form.state} onChange={(e) => { update("state", e.target.value); update("city", ""); }}><option value="">Select state</option>{Object.keys(stateCityMap).sort().map((state) => <option key={state}>{state}</option>)}</select>{errors.state && <small className="text-red-600">{errors.state}</small>}</Field>
              <Field label="City" required><input className={inputClass} list="hotel-cities" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="e.g. Udaipur" /><datalist id="hotel-cities">{cities.map((city) => <option key={city} value={city}/>)}</datalist>{errors.city && <small className="text-red-600">{errors.city}</small>}</Field>
              <Field label="Postal Code"><input className={inputClass} value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} placeholder="313001" /></Field>
              <Field label="Full Address"><textarea className={textareaClass} value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Street, area, city, state" /></Field>
              <Field label="Google Maps URL" hint="Optional link to the property's map location."><input className={inputClass} value={form.mapUrl} onChange={(e) => update("mapUrl", e.target.value)} placeholder="https://maps.google.com/..." /></Field>
            </div>
          </section>

          {/* Details */}
          <section className="rounded-2xl border border-[#E9E4D9] bg-white p-5 sm:p-6">
            <h3 className="font-serif text-xl text-[#182333]">Hotel Details</h3>
            <p className="mt-1 text-sm text-[#737A82]">Category, pricing and contact information.</p>
            <div className="mt-5 grid gap-x-6 gap-y-5 md:grid-cols-2">
              <Field label="Experience Category" required><select className={inputClass} value={form.category} onChange={(e) => update("category", e.target.value)}><option>Heritage</option><option>Mountain</option><option>Coastal</option></select></Field>
              <Field label="Starting Price per Night (₹)" required><input type="number" min="0" className={inputClass} value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="45000" />{errors.price && <small className="text-red-600">{errors.price}</small>}</Field>
              <Field label="Star Rating"><select className={inputClass} value={form.rating} onChange={(e) => update("rating", e.target.value)}>{["Unrated", "1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"].map((v) => <option key={v}>{v}</option>)}</select></Field>
              <div className="grid grid-cols-2 gap-3"><Field label="Check-in Time"><input type="time" className={inputClass} value={form.checkIn} onChange={(e) => update("checkIn", e.target.value)} /></Field><Field label="Check-out Time"><input type="time" className={inputClass} value={form.checkOut} onChange={(e) => update("checkOut", e.target.value)} /></Field></div>
              <Field label="Contact Email" required><input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="reservations@hotel.com" />{errors.email && <small className="text-red-600">{errors.email}</small>}</Field>
              <Field label="Contact Phone"><input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 294 242 4433" /></Field>
              <Field label="Website URL"><input type="url" className={inputClass} value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://www.example.com" /></Field>
            </div>
          </section>

          {/* Images */}
          <section className="rounded-2xl border border-[#E9E4D9] bg-white p-5 sm:p-6">
            <h3 className="font-serif text-xl text-[#182333]">Images</h3>
            <p className="mt-1 text-sm text-[#737A82]">Main cover and gallery shots shown on the public website.</p>
            <div className="mt-5 space-y-6">
              <Field label="Main Cover Image">
                <label className="flex min-h-[190px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#D9D1C3] bg-[#FBFAF7] text-center transition hover:border-[#B18A45]">
                  {form.coverImage ? <div className="relative w-full"><img src={form.coverImage} alt="Hotel cover preview" className="h-48 w-full object-cover"/><span className="absolute bottom-3 right-3 rounded-lg bg-white/90 px-3 py-1.5 text-xs text-[#182333]">Change image</span></div> : <><ImagePlus size={28} className="mb-2 text-[#737A82]"/><span className="text-sm text-[#737A82]">Click to upload a cover image</span><span className="mt-1 text-xs text-[#A5A7A8]">PNG, JPG or WEBP</span></>}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImage(e, "coverImage")} />
                </label>
              </Field>
              <Field label="Gallery Images" hint="You can select multiple images.">
                <label className="flex min-h-[105px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#D9D1C3] bg-[#FBFAF7] text-center hover:border-[#B18A45]"><ImagePlus size={23} className="mb-2 text-[#737A82]"/><span className="text-sm text-[#737A82]">Add gallery images</span><input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImage(e, "gallery", true)} /></label>
                {form.gallery.length > 0 && <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">{form.gallery.map((src, index) => <div key={`${src}-${index}`} className="group relative"><img src={src} alt={`Gallery ${index + 1}`} className="h-28 w-full rounded-lg object-cover"/><button type="button" onClick={() => removeGalleryImage(index)} className="absolute right-2 top-2 rounded-full bg-white p-1 text-[#182333] shadow"><X size={14}/></button></div>)}</div>}
              </Field>
            </div>
          </section>

          {/* Amenities */}
          <section className="rounded-2xl border border-[#E9E4D9] bg-white p-5 sm:p-6">
            <h3 className="font-serif text-xl text-[#182333]">Amenities</h3>
            <p className="mt-1 text-sm text-[#737A82]">Select everything the hotel offers.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{amenityOptions.map((amenity) => <label key={amenity} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${form.amenities.includes(amenity) ? "border-[#B18A45] bg-[#FBF8F1] text-[#182333]" : "border-[#E9E4D9] text-[#737A82] hover:border-[#D6C5A4]"}`}><input type="checkbox" checked={form.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} className="h-4 w-4 accent-[#B18A45]" />{amenity}</label>)}</div>
          </section>

          {/* Additional settings */}
          <section className="rounded-2xl border border-[#E9E4D9] bg-white p-5 sm:p-6">
            <h3 className="font-serif text-xl text-[#182333]">Additional Settings</h3>
            <p className="mt-1 text-sm text-[#737A82]">Featured placement, publication and SEO.</p>
            <div className="mt-5 space-y-5">
              <label className="flex items-center justify-between gap-4 rounded-xl border border-[#E9E4D9] bg-[#FBFAF7] p-4"><span><span className="block text-sm font-medium">Featured Hotel</span><span className="mt-1 block text-xs text-[#737A82]">Show this hotel on the homepage featured section.</span></span><input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="h-5 w-5 accent-[#B18A45]" /></label>
              <Field label="Publication Status"><select className={inputClass} value={form.status} onChange={(e) => update("status", e.target.value)}><option>Draft</option><option>Published</option><option>Archived</option></select></Field>
              <div className="grid gap-5 md:grid-cols-2"><Field label="SEO Title"><input className={inputClass} value={form.seoTitle} onChange={(e) => update("seoTitle", e.target.value)} placeholder="The Oberoi Udaivilas, Udaipur — Luxury Palace Hotel" /></Field><Field label="SEO Description"><textarea className={textareaClass} value={form.seoDescription} onChange={(e) => update("seoDescription", e.target.value)} placeholder="Meta description shown on search engines..." /></Field></div>
            </div>
          </section>

          <div className="flex flex-wrap justify-end gap-2 pb-4"><button type="button" onClick={() => navigate("/admin/hotels")} className="rounded-lg px-4 py-3 text-sm text-[#737A82] hover:bg-white">Cancel</button><button type="button" onClick={(e) => handleSubmit(e, "Draft")} className="inline-flex items-center gap-2 rounded-lg border border-[#E9E4D9] bg-white px-4 py-3 text-sm"><Save size={16}/> Save as Draft</button><button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#182333] px-5 py-3 text-sm text-white hover:bg-[#B18A45]"><Check size={16}/> {isEdit ? "Save Changes" : "Publish Hotel"}</button></div>
        </form>
      </div>
    </AdminLayout>
  );
}
