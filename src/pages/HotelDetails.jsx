import React from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";

const hotels = [
  {
    id: "1",
    name: "The Forest House",
    location: "Manali, Himachal Pradesh, India",
    category: "SIGNATURE MOUNTAIN STAY",
    rating: "4.9",
    reviews: "128 guest reviews",
    price: "₹8,500",
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1800",
    description:
      "Tucked among the pine-covered hills of Manali, The Forest House is a place to slow down, breathe deeply, and reconnect with the outdoors. Thoughtful spaces, warm hospitality, and views of the mountains make every stay feel personal.",
    highlights: ["Mountain views", "Surrounded by pine forest", "Quiet, intimate setting"],
    amenities: ["Free Wi-Fi", "Restaurant", "Room service", "Parking", "Mountain view", "24-hour assistance"],
  },
  {
    id: "2",
    name: "The Heritage Palace",
    location: "Agra, Uttar Pradesh, India",
    category: "HERITAGE COLLECTION",
    rating: "4.8",
    reviews: "96 guest reviews",
    price: "₹12,000",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800",
    description:
      "Inspired by the architectural character of a bygone era, The Heritage Palace brings together timeless details and considered comforts. Discover a stay shaped by local culture, gracious spaces, and a sense of history.",
    highlights: ["Heritage-inspired architecture", "Elegant dining", "Close to local landmarks"],
    amenities: ["Free Wi-Fi", "Restaurant", "Room service", "Parking", "Garden", "24-hour assistance"],
  },
  {
    id: "3",
    name: "Mountain Retreat",
    location: "Srinagar, Kashmir, India",
    category: "WILDERNESS ESCAPE",
    rating: "4.7",
    reviews: "84 guest reviews",
    price: "₹9,200",
    image:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=1800",
    description:
      "A peaceful base for discovering the beauty of Kashmir. Mountain Retreat invites you to enjoy unhurried mornings, open landscapes, and the comfort of a thoughtfully selected stay.",
    highlights: ["Scenic surroundings", "Peaceful atmosphere", "Ideal for slow travel"],
    amenities: ["Free Wi-Fi", "Restaurant", "Room service", "Parking", "Scenic views", "24-hour assistance"],
  },
  {
    id: "4",
    name: "The Coastal House",
    location: "Goa, India",
    category: "COASTAL COLLECTION",
    rating: "4.8",
    reviews: "112 guest reviews",
    price: "₹10,500",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800",
    description:
      "A relaxed coastal escape designed for days that unfold at their own pace. Enjoy the warmth of the surroundings, inviting spaces, and the easy rhythm of a seaside holiday.",
    highlights: ["Coastal location", "Relaxed atmosphere", "Outdoor spaces"],
    amenities: ["Free Wi-Fi", "Restaurant", "Room service", "Parking", "Swimming pool", "24-hour assistance"],
  },
  {
    id: "5",
    name: "The Garden Villa",
    location: "Jaipur, Rajasthan, India",
    category: "HERITAGE COLLECTION",
    rating: "4.6",
    reviews: "73 guest reviews",
    price: "₹7,800",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1800",
    description:
      "An intimate retreat with warm hospitality and thoughtful details. The Garden Villa offers a calm place to return to after exploring Jaipur's colour, craft, and culture.",
    highlights: ["Garden setting", "Intimate atmosphere", "Local cultural experiences"],
    amenities: ["Free Wi-Fi", "Restaurant", "Room service", "Parking", "Garden", "24-hour assistance"],
  },
  {
    id: "6",
    name: "The Lake Pavilion",
    location: "Udaipur, Rajasthan, India",
    category: "SIGNATURE STAY",
    rating: "4.9",
    reviews: "145 guest reviews",
    price: "₹14,000",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800",
    description:
      "Set against the romantic atmosphere of Udaipur, The Lake Pavilion is a considered escape for travellers who appreciate beautiful views, thoughtful service, and unhurried moments.",
    highlights: ["Lake views", "Elegant interiors", "Close to the old city"],
    amenities: ["Free Wi-Fi", "Restaurant", "Room service", "Parking", "Lake view", "24-hour assistance"],
  },
];

function HotelDetails() {
  const { id } = useParams();
  const hotel = hotels.find((item) => item.id === id);

  if (!hotel) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7] px-6 text-center text-[#182333]">
        <span className="text-[11px] tracking-[3px] text-[#B18A45]">
          HOTELENQUIRY
        </span>
        <h1 className="mt-5 font-serif text-5xl">Stay not found</h1>
        <p className="mt-4 text-sm text-[#737A82]">
          We couldn't find the stay you're looking for.
        </p>
        <Link
          to="/hotels"
          className="mt-8 bg-[#B18A45] px-7 py-4 text-sm text-white transition hover:bg-[#927039]"
        >
          Browse all stays →
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#FDFBF7] text-[#182333]">
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
          <Link to="/hotels" className="text-[#B18A45]">Hotels</Link>
          <Link to="/#experiences" className="transition hover:text-[#B18A45]">Experiences</Link>
          <Link to="/about-contact" className="transition hover:text-[#B18A45]">About & Contact</Link>
        </div>

        <Link
          to="/enquiry"
          className="bg-[#B18A45] px-5 py-4 text-sm text-white transition hover:bg-[#927039]"
        >
          Make an enquiry <span className="ml-2">→</span>
        </Link>
      </nav>

      {/* BREADCRUMB */}
      <div className="px-[9%] pt-8 text-xs text-[#858B91]">
        <Link to="/" className="hover:text-[#B18A45]">Home</Link>
        <span className="mx-3">/</span>
        <Link to="/hotels" className="hover:text-[#B18A45]">Hotels</Link>
        <span className="mx-3">/</span>
        <span className="text-[#B18A45]">{hotel.name}</span>
      </div>

      {/* HOTEL HERO */}
      <section className="px-[5%] pb-14 pt-7 md:pb-20">
        <div className="relative h-[420px] overflow-hidden md:h-[590px]">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/70 via-transparent to-black/10" />
          <div className="absolute bottom-8 left-7 right-7 text-white md:bottom-14 md:left-14">
            <span className="text-[10px] tracking-[3px] text-[#E1C487]">
              {hotel.category}
            </span>
            <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] md:text-7xl">
              {hotel.name}
            </h1>
            <p className="mt-4 text-sm text-white/85">{hotel.location}</p>
          </div>
        </div>
      </section>

      {/* OVERVIEW AND ENQUIRY CARD */}
      <section className="grid grid-cols-1 gap-14 px-[9%] pb-20 lg:grid-cols-[1.5fr_0.8fr] lg:gap-24">
        <div>
          <span className="text-[10px] tracking-[3px] text-[#B18A45]">
            A PLACE TO REMEMBER
          </span>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            More than a stay.
            <em className="text-[#B18A45]"> An experience.</em>
          </h2>
          <p className="mt-7 max-w-2xl text-sm leading-8 text-[#737A82]">
            {hotel.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-8 border-y border-[#E5E7EB] py-6">
            <div>
              <span className="block text-2xl text-[#B18A45]">★ {hotel.rating}</span>
              <span className="mt-1 block text-xs text-[#858B91]">{hotel.reviews}</span>
            </div>
            <div>
              <span className="block font-serif text-2xl">{hotel.price}</span>
              <span className="mt-1 block text-xs text-[#858B91]">Starting price / night</span>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-3xl">The highlights</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {hotel.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 text-sm text-[#68717C]">
                  <span className="text-[#B18A45]">✦</span>
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit border border-[#E5E7EB] bg-white p-7 md:p-9">
          <span className="text-[10px] tracking-[2px] text-[#B18A45]">
            PLAN YOUR STAY
          </span>
          <h3 className="mt-3 font-serif text-3xl">Interested in this place?</h3>
          <p className="mt-4 text-sm leading-7 text-[#737A82]">
            Tell us a little about your plans. Our team will help you with
            availability, details, and your stay enquiry.
          </p>
          <div className="my-7 border-t border-[#E5E7EB] pt-6">
            <span className="text-xs text-[#858B91]">Starting from</span>
            <p className="mt-1 font-serif text-3xl">{hotel.price}<span className="font-sans text-xs text-[#858B91]"> / night</span></p>
          </div>
          <Link
            to={`/enquiry?hotel=${encodeURIComponent(hotel.name)}`}
            className="flex w-full items-center justify-between bg-[#B18A45] px-6 py-4 text-sm text-white transition hover:bg-[#927039]"
          >
            Enquire about this stay <span className="text-lg">→</span>
          </Link>
          <p className="mt-4 text-center text-[10px] leading-5 text-[#92979D]">
            This is an enquiry, not an instant booking.
          </p>
        </aside>
      </section>

      {/* AMENITIES */}
      <section className="bg-[#F5F1E9] px-[9%] py-20">
        <span className="text-[10px] tracking-[3px] text-[#B18A45]">
          THOUGHTFUL COMFORTS
        </span>
        <h2 className="mt-3 font-serif text-4xl md:text-5xl">A few of the details</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
          {hotel.amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-3 border-b border-[#DED8CE] pb-4 text-sm text-[#59616B]">
              <span className="text-[#B18A45]">✧</span>
              {amenity}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-[9%] py-20 text-center">
        <span className="text-[10px] tracking-[3px] text-[#B18A45]">
          YOUR NEXT JOURNEY BEGINS HERE
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
          Let’s make this stay part of your story.
        </h2>
        <Link
          to={`/enquiry?hotel=${encodeURIComponent(hotel.name)}`}
          className="mt-8 inline-flex items-center gap-8 bg-[#B18A45] px-7 py-4 text-sm text-white transition hover:bg-[#927039]"
        >
          Send an enquiry <span>→</span>
        </Link>
        <div className="mt-8">
          <Link to="/hotels" className="text-xs text-[#737A82] underline underline-offset-4 hover:text-[#B18A45]">
            Back to all hotels
          </Link>
        </div>
      </section>

      <Footer/>
    </main>
  );
}

export default HotelDetails;
