import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const hotels = [
  {
    id: 1,
    name: "The Forest House",
    location: "Manali, Himachal Pradesh",
    city: "Manali",
    state: "Himachal Pradesh",
    category: "Mountain",
    rating: "4.9",
    price: "₹8,500",
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
    description: "A quiet hideaway surrounded by pine forests and mountain air.",
  },
  {
    id: 2,
    name: "The Heritage Palace",
    location: "Agra, Uttar Pradesh",
    city: "Agra",
    state: "Uttar Pradesh",
    category: "Heritage",
    rating: "4.8",
    price: "₹12,000",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
    description: "A timeless stay inspired by India's rich architectural heritage.",
  },
  {
    id: 3,
    name: "Mountain Retreat",
    location: "Srinagar, Kashmir",
    city: "Srinagar",
    state: "Jammu & Kashmir",
    category: "Mountain",
    rating: "4.7",
    price: "₹9,200",
    image:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=1200",
    description: "Slow mornings, beautiful views, and a little room to unwind.",
  },
  {
    id: 4,
    name: "The Coastal House",
    location: "Goa",
    city: "Goa",
    state: "Goa",
    category: "Coastal",
    rating: "4.8",
    price: "₹10,500",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200",
    description: "A relaxed coastal escape close to the rhythm of the sea.",
  },
  {
    id: 5,
    name: "The Garden Villa",
    location: "Jaipur, Rajasthan",
    city: "Jaipur",
    state: "Rajasthan",
    category: "Heritage",
    rating: "4.6",
    price: "₹7,800",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200",
    description: "An intimate retreat with thoughtful details and warm hospitality.",
  },
  {
    id: 6,
    name: "The Lake Pavilion",
    location: "Udaipur, Rajasthan",
    city: "Udaipur",
    state: "Rajasthan",
    category: "Coastal",
    rating: "4.9",
    price: "₹14,000",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200",
    description: "A peaceful stay overlooking the water and the old city.",
  },
];

const categories = ["Mountain", "Coastal", "Heritage"];

function Hotels() {
  const [activeCategory, setActiveCategory] = useState("All stays");
  const [selectedState, setSelectedState] = useState("All states");
  const [selectedCity, setSelectedCity] = useState("All cities");
  const [search, setSearch] = useState("");

  // Filter options are derived from the hotel records, so empty locations
  // never appear in the dropdowns.
  const availableStates = useMemo(
    () => [...new Set(hotels.map((hotel) => hotel.state))].sort(),
    []
  );

  const availableCities = useMemo(() => {
    const matchingHotels =
      selectedState === "All states"
        ? hotels
        : hotels.filter((hotel) => hotel.state === selectedState);

    return [...new Set(matchingHotels.map((hotel) => hotel.city))].sort();
  }, [selectedState]);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesCategory =
        activeCategory === "All stays" || hotel.category === activeCategory;
      const matchesState =
        selectedState === "All states" || hotel.state === selectedState;
      const matchesCity =
        selectedCity === "All cities" || hotel.city === selectedCity;
      const searchText =
        `${hotel.name} ${hotel.location} ${hotel.city} ${hotel.state}`.toLowerCase();
      const matchesSearch = searchText.includes(search.toLowerCase().trim());

      return matchesCategory && matchesState && matchesCity && matchesSearch;
    });
  }, [activeCategory, selectedState, selectedCity, search]);

  const selectClass =
    "w-full appearance-none border-b border-[#B8B9B8] bg-transparent py-3 pr-7 text-sm text-[#59616B] outline-none focus:border-[#B18A45]";

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
          <Link to="/" className="transition hover:text-[#B18A45]">
            Discover
          </Link>
          <Link to="/hotels" className="text-[#B18A45]">
            Hotels
          </Link>
          <Link to="/#experiences" className="transition hover:text-[#B18A45]">
            Experiences
          </Link>
          <Link to="/about-contact" className="transition hover:text-[#B18A45]">
            About & Contact
          </Link>
        </div>

        <Link
          to="/about-contact"
          className="bg-[#B18A45] px-5 py-4 text-sm text-white transition hover:bg-[#927039]"
        >
          Get in touch <span className="ml-3">→</span>
        </Link>
      </nav>

      {/* PAGE INTRO */}
      <section className="px-[9%] pb-7 pt-8 md:pb-9 md:pt-10">
        <span className="text-[11px] tracking-[3px] text-[#B18A45]">
          THE HOTEL COLLECTION
        </span>
        <div className="mt-3 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <h1 className="max-w-[760px] font-serif text-5xl leading-[1.02] md:text-7xl">
            Find a place
            <br />
            <em className="font-normal text-[#B18A45]">to feel somewhere.</em>
          </h1>
          <p className="max-w-[340px] pb-1 text-sm leading-6 text-[#68717C]">
            Discover considered stays, from quiet mountain hideaways to
            character-filled heritage hotels.
          </p>
        </div>
      </section>

      {/* SINGLE-ROW FILTER BAR */}
      <section className="px-[9%]">
        <div className="border-y border-[#E5E7EB] py-4">
          <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[0.85fr_1fr_1fr_1.5fr] xl:gap-5">
            <label className="min-w-0">
              <span className="mb-1 block text-[9px] tracking-[1.5px] text-[#A17B3F]">
                EXPERIENCE
              </span>
              <select
                value={activeCategory}
                onChange={(event) => setActiveCategory(event.target.value)}
                className={selectClass}
              >
                <option value="All stays">All experiences</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>

            <label className="min-w-0">
              <span className="mb-1 block text-[9px] tracking-[1.5px] text-[#A17B3F]">
                STATE
              </span>
              <select
                value={selectedState}
                onChange={(event) => {
                  setSelectedState(event.target.value);
                  setSelectedCity("All cities");
                }}
                className={selectClass}
              >
                <option value="All states">All states</option>
                {availableStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </label>

            <label className="min-w-0">
              <span className="mb-1 block text-[9px] tracking-[1.5px] text-[#A17B3F]">
                CITY
              </span>
              <select
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
                className={selectClass}
              >
                <option value="All cities">All cities</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </label>

            <label className="flex min-w-0 items-center gap-3 border-b border-[#B8B9B8] py-3">
              <span className="text-lg text-[#B18A45]">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search hotel or destination"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[#92979D]"
              />
            </label>
          </div>
        </div>
      </section>

      {/* HOTEL GRID */}
      <section className="px-[9%] pb-16 pt-7 md:pb-20 md:pt-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-[#68717C]">
            Showing <span className="font-semibold text-[#182333]">{filteredHotels.length}</span>{" "}
            thoughtfully selected stays
          </p>
          <span className="hidden text-[10px] tracking-[2px] text-[#B18A45] sm:block">
            MADE FOR MEMORABLE JOURNEYS
          </span>
        </div>

        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {filteredHotels.map((hotel) => (
              <article key={hotel.id} className="group">
                <Link
                  to={`/hotels/${hotel.id}`}
                  className="relative block h-[330px] overflow-hidden bg-[#F1EDE5]"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-[#FDFBF7] px-3 py-2 text-[10px] tracking-[1px]">
                    {hotel.category.toUpperCase()} STAY
                  </span>
                  <span className="absolute right-4 top-4 bg-[#FDFBF7] px-3 py-2 text-xs text-[#B18A45]">
                    ★ {hotel.rating}
                  </span>
                </Link>

                <div className="flex items-start justify-between gap-4 pt-5">
                  <div>
                    <h2 className="font-serif text-2xl">{hotel.name}</h2>
                    <p className="mt-1 text-xs text-[#7B8188]">
                      {hotel.location}
                    </p>
                  </div>
                  <span className="whitespace-nowrap text-sm text-[#182333]">
                    {hotel.price}
                    <span className="block text-right text-[10px] text-[#92979D]">
                      onwards
                    </span>
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#737A82]">
                  {hotel.description}
                </p>

                <Link
                  to={`/hotels/${hotel.id}`}
                  className="mt-5 inline-flex items-center gap-4 border-b border-[#B18A45] pb-2 text-xs text-[#B18A45] transition hover:gap-6"
                >
                  Explore this stay <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="font-serif text-3xl">No stays found</h2>
            <p className="mt-3 text-sm text-[#737A82]">
              Try another destination or choose a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All stays");
                setSelectedState("All states");
                setSelectedCity("All cities");
              }}
              className="mt-6 border border-[#B18A45] px-6 py-3 text-xs text-[#B18A45] transition hover:bg-[#B18A45] hover:text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
<Footer/>
    </main>
  );
}

export default Hotels;
