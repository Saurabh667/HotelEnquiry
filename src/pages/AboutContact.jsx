import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function AboutContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Connect this form to the Django contact API when the endpoint is ready.
    setSubmitted(true);
  };

  const inputClass =
    "w-full border-b border-[#D8D5CE] bg-transparent px-0 py-3 text-sm text-[#182333] outline-none transition placeholder:text-[#A0A3A5] focus:border-[#B18A45]";

  return (
    <main className="min-h-screen overflow-hidden bg-[#FDFBF7] text-[#182333]">
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
          <Link to="/about-contact" className="text-[#B18A45]">About & Contact</Link>
        </div>

        <Link
          to="/enquiry"
          className="bg-[#B18A45] px-5 py-4 text-sm text-white transition hover:bg-[#927039]"
        >
          Make an enquiry <span className="ml-2">→</span>
        </Link>
      </nav>

      {/* PAGE INTRO */}
      <section className="px-[9%] pb-14 pt-12 md:pb-20 md:pt-16">
        <span className="text-[10px] tracking-[3px] text-[#B18A45]">
          A LITTLE ABOUT US
        </span>
        <div className="mt-4 grid gap-7 md:grid-cols-[1.4fr_0.6fr] md:items-end">
          <h1 className="font-serif text-5xl leading-[1.04] md:text-7xl">
            Travel is about
            <br />
            <em className="font-normal text-[#B18A45]">how a place makes you feel.</em>
          </h1>
          <p className="max-w-sm pb-1 text-sm leading-7 text-[#737A82]">
            We bring together distinctive stays and thoughtful experiences
            to help you discover places worth remembering.
          </p>
        </div>
      </section>

      {/* ABOUT STORY */}
      <section className="grid items-center gap-10 bg-[#F5F1E9] px-[9%] py-14 md:grid-cols-2 md:gap-20 md:py-20">
        <div className="h-[360px] overflow-hidden md:h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1400"
            alt="A thoughtfully designed travel destination"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <span className="text-[10px] tracking-[3px] text-[#B18A45]">
            OUR POINT OF VIEW
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            The right stay can change the way you experience a journey.
          </h2>
          <p className="mt-6 text-sm leading-8 text-[#737A82]">
            At HotelEnquiry, we believe choosing a place to stay should feel
            as considered as choosing where to travel. We are building a
            collection of hotels for people who value character, comfort,
            thoughtful details, and a genuine sense of place.
          </p>
          <p className="mt-4 text-sm leading-8 text-[#737A82]">
            Whether it is a quiet mountain escape, a coastal break, or a
            heritage stay, our aim is to make discovering your next stay
            simple and personal.
          </p>
          <Link
            to="/hotels"
            className="mt-8 inline-flex items-center gap-6 border-b border-[#B18A45] pb-2 text-xs text-[#B18A45] transition hover:gap-8"
          >
            Explore our collection <span>→</span>
          </Link>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-[9%] py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="text-[10px] tracking-[3px] text-[#B18A45]">
            WHAT MATTERS TO US
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            A more thoughtful way to find your stay.
          </h2>
        </div>

        <div className="mt-12 grid gap-9 border-t border-[#E5E7EB] pt-8 md:grid-cols-3 md:gap-12">
          <article>
            <span className="font-serif text-3xl text-[#B18A45]">01</span>
            <h3 className="mt-5 font-serif text-2xl">Character over convention</h3>
            <p className="mt-3 text-sm leading-7 text-[#737A82]">
              We value places with their own identity, atmosphere, and story.
            </p>
          </article>
          <article>
            <span className="font-serif text-3xl text-[#B18A45]">02</span>
            <h3 className="mt-5 font-serif text-2xl">Details that matter</h3>
            <p className="mt-3 text-sm leading-7 text-[#737A82]">
              The little things can make a stay feel personal and memorable.
            </p>
          </article>
          <article>
            <span className="font-serif text-3xl text-[#B18A45]">03</span>
            <h3 className="mt-5 font-serif text-2xl">Travel made personal</h3>
            <p className="mt-3 text-sm leading-7 text-[#737A82]">
              We make it easier to share what you are looking for and enquire
              about a stay that suits your plans.
            </p>
          </article>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-[#182333] px-[9%] py-16 text-[#FDFBF7] md:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <span className="text-[10px] tracking-[3px] text-[#D7B46B]">
              GET IN TOUCH
            </span>
            <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
              We would love to hear from you.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-gray-300">
              Have a question, need help choosing a stay, or want to work with
              us? Send us a message and our team will be happy to hear from you.
            </p>

            <div className="mt-10 border-t border-white/15 pt-7">
              <span className="text-[10px] tracking-[2px] text-[#D7B46B]">EMAIL</span>
              <a
                href="mailto:hello@hotel-enquiry.com"
                className="mt-3 block text-sm text-gray-200 transition hover:text-[#D7B46B]"
              >
                hello@hotel-enquiry.com
              </a>
            </div>
          </div>

          <div className="bg-white p-7 text-[#182333] md:p-10">
            {submitted ? (
              <div className="py-12 text-center">
                <span className="text-3xl text-[#B18A45]">✧</span>
                <h3 className="mt-5 font-serif text-3xl">Message received.</h3>
                <p className="mt-3 text-sm leading-7 text-[#737A82]">
                  Thank you for contacting HotelEnquiry. This is a frontend
                  preview; the contact API will be connected later.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-6 text-xs text-[#B18A45] underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-serif text-3xl">Send us a message</h3>
                <div className="mt-7 space-y-6">
                  <label className="block text-xs text-[#68717C]">
                    Your name *
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-xs text-[#68717C]">
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
                  <label className="block text-xs text-[#68717C]">
                    Subject
                    <input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What would you like to discuss?"
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-xs text-[#68717C]">
                    Message *
                    <textarea
                      required
                      rows="4"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className={`${inputClass} resize-y`}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="mt-8 inline-flex items-center gap-7 bg-[#B18A45] px-7 py-4 text-sm text-white transition hover:bg-[#927039]"
                >
                  Send message <span>→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default AboutContact;
