import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const hotels = [
  {
    name: "The Forest House",
    location: "Manali, Himachal Pradesh",
    category: "SIGNATURE STAY",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000",
  },
  {
    name: "The Heritage Palace",
    location: "Agra, Uttar Pradesh",
    category: "HERITAGE",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000",
  },
  {
    name: "Mountain Retreat",
    location: "Srinagar, Kashmir",
    category: "WILDERNESS",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000",
  },
];

const experiences = [
  {
    title: "Mountain Escapes",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000",
  },
  {
    title: "Coastal Retreats",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1000",
  },
  {
    title: "Heritage Stays",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1000",
  },
];

function Home() {
  return (
    <main className="overflow-hidden bg-[#FDFBF7] text-[#182333]">

      {/* NAVBAR */}
      <nav className="relative z-20 flex h-24 items-center justify-between bg-[#FDFBF7] px-[5%]">

        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B18A45] font-serif text-2xl text-[#B18A45]">
            H
          </span>

          <span>
            <strong className="block text-[13px] tracking-[2px]">
              HOTELENQUIRY
            </strong>
            <small className="block text-[9px] tracking-[3px] text-[#B18A45]">
              STAYS & EXPERIENCES
            </small>
          </span>
        </Link>

        <div className="hidden items-center gap-9 text-sm text-[#46505D] lg:flex">
          <Link to="/" className="transition hover:text-[#B18A45]">Discover</Link>
          <Link to="/hotels" className="transition hover:text-[#B18A45]">Hotels</Link>
          <a href="#experiences" className="transition hover:text-[#B18A45]">Experiences</a>
          <a href="#story" className="transition hover:text-[#B18A45]">Our Story</a>
          <Link to="/about-contact" className="transition hover:text-[#B18A45]">Contact</Link>
        </div>

        <div className="flex items-center gap-6">
          {/* <Link to="/admin" className="hidden text-sm hover:text-[#B18A45] sm:block">
            Sign in
          </Link> */}

          <Link
            to="/hotels"
            className="flex items-center gap-5 bg-[#B18A45] px-5 py-4 text-sm text-white transition hover:bg-[#927039]"
          >
            Explore stays <span className="text-lg">→</span>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative flex min-h-[750px] h-[calc(100vh-96px)] max-h-[900px] items-center bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#101820]/90 via-[#101820]/55 to-transparent" />

        <div className="relative z-10 ml-[11%] max-w-[650px]">
          <span className="mb-7 block text-[11px] tracking-[3px] text-[#B18A45]">
            ✧ &nbsp; STAYS WITH A SOUL
          </span>

          <h1 className="font-serif text-[clamp(60px,7vw,94px)] font-medium leading-[0.88] tracking-[-2px]">
            Go somewhere
            <br />
            <em className="font-normal text-[#D7B46B]">worth</em>
            <br />
            <em className="font-normal text-[#D7B46B]">
              remembering.
            </em>
          </h1>

          <p className="my-9 max-w-[450px] text-[15px] leading-8 text-[#EEEAE4]">
            Thoughtfully chosen hotels and journeys for the curious,
            the unhurried, and the beautifully particular.
          </p>

          <Link
            to="/hotels"
            className="inline-flex items-center gap-8 bg-[#B18A45] px-7 py-4 text-sm text-white transition hover:bg-[#927039]"
          >
            Find your stay <span className="text-lg">→</span>
          </Link>
        </div>

        <div className="absolute bottom-20 right-[10%] flex items-center gap-5 text-sm">
          <span className="text-[#D7B46B]">01</span>
          <div>
            <strong className="block">Discover extraordinary stays</strong>
            <small className="text-gray-300">India & beyond</small>
          </div>
        </div>

        <div className="absolute bottom-7 left-[5%] text-[10px] tracking-[2px]">
          SCROLL TO WANDER &nbsp; ↓
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        id="story"
        className="grid grid-cols-1 items-center gap-8 px-[9%] py-28 md:grid-cols-[1fr_5fr_1fr]"
      >
        <span className="text-[11px] tracking-[2px] text-[#B18A45]">
          H / 01
        </span>

        <h2 className="max-w-[850px] font-serif text-4xl font-normal leading-[1.15] md:text-[48px]">
          We believe the best trips leave a little room for surprise.
          A considered collection of places with a point of view —
          and the people who make them feel like home.
        </h2>

        <Link
          to="/about-contact"
          className="hidden h-14 w-14 items-center justify-center rounded-full border border-[#B18A45] text-2xl text-[#B18A45] transition hover:bg-[#B18A45] hover:text-white md:flex"
        >
          →
        </Link>
      </section>

      {/* FEATURED HOTELS */}
      <section className="px-[9%] pb-28 pt-12">

        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-[11px] tracking-[3px] text-[#B18A45]">
              THE COLLECTION
            </span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              Places that stay with you
            </h2>
          </div>

          <Link
            to="/hotels"
            className="pb-2 text-xs text-[#B18A45] transition hover:translate-x-1"
          >
            View all stays &nbsp; →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <article key={hotel.name} className="group cursor-pointer">

              <div className="relative h-[350px] overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 bg-[#FDFBF7] px-3 py-2 text-[10px] tracking-wider">
                  {hotel.category}
                </span>

                <span className="absolute right-4 top-4 bg-[#FDFBF7] px-3 py-2 text-xs text-[#B18A45]">
                  ★ {hotel.rating}
                </span>
              </div>

              <div className="flex items-center justify-between py-5">
                <div>
                  <h3 className="font-serif text-2xl">
                    {hotel.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {hotel.location}
                  </p>
                </div>

                <Link
                  to="/hotels"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B18A45] text-[#B18A45] transition hover:bg-[#B18A45] hover:text-white"
                >
                  ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* EXPERIENCES */}
      <section
        id="experiences"
        className="bg-[#F5F1E9] px-[9%] py-24"
      >
        <span className="text-[11px] tracking-[3px] text-[#B18A45]">
          FIND YOUR KIND OF ESCAPE
        </span>

        <h2 className="mb-10 mt-3 font-serif text-5xl">
          Travel by feeling
        </h2>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {experiences.map((experience) => (
            <Link
              to="/hotels"
              key={experience.title}
              className="group relative h-[390px] overflow-hidden"
            >
              <img
                src={experience.image}
                alt={experience.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 text-white">
                <h3 className="font-serif text-3xl">
                  {experience.title}
                </h3>
                <p className="mt-2 text-xs">
                  Explore stays ↗
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="grid grid-cols-1 items-center gap-12 px-[9%] py-28 md:grid-cols-2 md:gap-20">

        <div className="h-[480px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200"
            alt="Luxury resort"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <span className="text-[11px] tracking-[3px] text-[#B18A45]">
            A DIFFERENT WAY TO DISCOVER
          </span>

          <h2 className="my-6 font-serif text-5xl leading-tight">
            Not just a place to stay.
            <em className="text-[#B18A45]"> A place to belong.</em>
          </h2>

          <p className="mb-8 max-w-[430px] text-sm leading-8 text-gray-500">
            We believe every memorable journey begins with the right
            place. Discover thoughtfully selected hotels that offer
            more than just a room — they offer an experience.
          </p>

          <Link
            to="/about-contact"
            className="inline-flex items-center gap-7 bg-[#B18A45] px-7 py-4 text-sm text-white transition hover:bg-[#927039]"
          >
            Discover our story <span>→</span>
          </Link>
        </div>
      </section>
        
        <Footer/>

    </main>
  );
}

export default Home;