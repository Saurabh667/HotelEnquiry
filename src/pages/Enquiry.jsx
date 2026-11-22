import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";

function Enquiry() {
  const [searchParams] = useSearchParams();
  const hotelFromUrl = searchParams.get("hotel") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    hotel: hotelFromUrl,
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    roomType: "Double room",
    rooms: "1",
    mealPlan: "No preference",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (hotelFromUrl) {
      setFormData((current) => ({ ...current, hotel: hotelFromUrl }));
    }
  }, [hotelFromUrl]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Connect this handler to the Django enquiry API when the backend endpoint is ready.
    setSubmitted(true);
  };

  const inputClass =
    "w-full border-b border-[#D8D5CE] bg-transparent px-0 py-3 text-sm text-[#182333] outline-none transition placeholder:text-[#A0A3A5] focus:border-[#B18A45]";

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#182333]">
      {/* NAVBAR */}
      <nav className="flex h-24 items-center justify-between px-[5%]">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B18A45] font-serif text-2xl text-[#B18A45]">
            H
          </span>
          <span>
            <strong className="block text-[13px] tracking-[2px]">HOTELENQUIRY</strong>
            <small className="block text-[9px] tracking-[3px] text-[#B18A45]">
              STAYS & EXPERIENCES
            </small>
          </span>
        </Link>

        <div className="hidden items-center gap-9 text-sm text-[#46505D] md:flex">
          <Link to="/" className="transition hover:text-[#B18A45]">Discover</Link>
          <Link to="/hotels" className="transition hover:text-[#B18A45]">Hotels</Link>
          <Link to="/about-contact" className="transition hover:text-[#B18A45]">About & Contact</Link>
        </div>

        <Link to="/hotels" className="text-sm text-[#B18A45] hover:text-[#927039]">
          Browse stays →
        </Link>
      </nav>

      {/* PAGE INTRO */}
      <section className="px-[9%] pb-10 pt-12 md:pb-14 md:pt-16">
        <span className="text-[10px] tracking-[3px] text-[#B18A45]">
          YOUR JOURNEY STARTS HERE
        </span>
        <div className="mt-4 grid gap-5 md:grid-cols-[1.4fr_0.6fr] md:items-end">
          <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl">
            Tell us what
            <br />
            <em className="font-normal text-[#B18A45]">you have in mind.</em>
          </h1>
          <p className="max-w-sm text-sm leading-7 text-[#737A82]">
            Share a few details about your plans. Our team will get in touch
            to help you explore the right stay.
          </p>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="px-[9%] pb-20">
        {submitted ? (
          <div className="border border-[#E5E1D8] bg-white px-7 py-16 text-center md:px-16">
            <span className="text-3xl text-[#B18A45]">✧</span>
            <h2 className="mt-5 font-serif text-4xl">Thank you for reaching out.</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#737A82]">
              Your enquiry has been captured in this preview. Once the Django
              enquiry API is connected, this form will submit your details to
              the HotelEnquiry team.
            </p>
            <Link
              to="/hotels"
              className="mt-8 inline-flex bg-[#B18A45] px-7 py-4 text-sm text-white transition hover:bg-[#927039]"
            >
              Explore more stays →
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 border-t border-[#E5E7EB] pt-10 lg:grid-cols-[1fr_300px] lg:gap-20">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <span className="text-[10px] tracking-[2px] text-[#B18A45]">01 / YOUR DETAILS</span>
                <div className="mt-5 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  <label className="text-xs text-[#68717C]">
                    Full name *
                    <input
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-xs text-[#68717C]">
                    Email address *
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-xs text-[#68717C]">
                    Phone number *
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-xs text-[#68717C]">
                    Hotel of interest
                    <input
                      name="hotel"
                      value={formData.hotel}
                      onChange={handleChange}
                      placeholder="Choose a hotel"
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>

              <div>
                <span className="text-[10px] tracking-[2px] text-[#B18A45]">02 / YOUR TRIP</span>
                <div className="mt-5 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  <label className="text-xs text-[#68717C]">
                    Destination
                    <input
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="Where would you like to go?"
                      className={inputClass}
                    />
                  </label>
                  <label className="text-xs text-[#68717C]">
                    Number of guests
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
                        <option key={count} value={String(count)}>{count} {count === 1 ? "guest" : "guests"}</option>
                      ))}
                      <option value="10+">More than 10 guests</option>
                    </select>
                  </label>
                  <label className="text-xs text-[#68717C]">
                    Room type
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Single room">Single room</option>
                      <option value="Double room">Double room</option>
                      <option value="Twin room">Twin room</option>
                      <option value="Family room">Family room</option>
                      <option value="Suite">Suite</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </label>
                  <label className="text-xs text-[#68717C]">
                    Number of rooms
                    <select
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
                        <option key={count} value={String(count)}>{count} {count === 1 ? "room" : "rooms"}</option>
                      ))}
                      <option value="10+">More than 10 rooms</option>
                    </select>
                  </label>
                  <label className="text-xs text-[#68717C]">
                    Meal preference
                    <select
                      name="mealPlan"
                      value={formData.mealPlan}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="No preference">No preference</option>
                      <option value="Room only">Room only</option>
                      <option value="Breakfast included">Breakfast included</option>
                      <option value="Half board">Half board (breakfast and one meal)</option>
                      <option value="Full board">Full board (all main meals)</option>
                    </select>
                  </label>
                  <label className="text-xs text-[#68717C]">
                    Check-in date
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={inputClass}
                    />
                  </label>
                  <label className="text-xs text-[#68717C]">
                    Check-out date
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={formData.checkIn || new Date().toISOString().split("T")[0]}
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>

              <div>
                <span className="text-[10px] tracking-[2px] text-[#B18A45]">03 / ANYTHING ELSE?</span>
                <label className="mt-5 block text-xs text-[#68717C]">
                  Additional requirements
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any dietary preferences, accessibility needs, bed preferences, celebrations, or other special requests..."
                    className={`${inputClass} resize-y`}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-8 bg-[#B18A45] px-8 py-4 text-sm text-white transition hover:bg-[#927039]"
              >
                Send enquiry <span className="text-lg">→</span>
              </button>
              <p className="text-[10px] leading-5 text-[#92979D]">
                By submitting this form, you agree that our team may contact
                you about your enquiry.
              </p>
            </form>

            <aside className="h-fit bg-[#F5F1E9] p-7 md:p-8">
              <span className="text-[10px] tracking-[2px] text-[#B18A45]">HERE TO HELP</span>
              <h2 className="mt-4 font-serif text-3xl">A more thoughtful way to travel.</h2>
              <p className="mt-5 text-sm leading-7 text-[#737A82]">
                Whether you know exactly where you want to go or are still
                exploring, share your thoughts and we'll help you take the
                next step.
              </p>
              <div className="mt-8 border-t border-[#DED8CE] pt-6">
                <span className="text-[10px] tracking-[1.5px] text-[#A17B3F]">EMAIL</span>
                <a href="mailto:hello@hotel-enquiry.com" className="mt-2 block text-sm hover:text-[#B18A45]">
                  hello@hotel-enquiry.com
                </a>
              </div>
            </aside>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default Enquiry;
