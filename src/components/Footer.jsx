import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-[#182333] px-[9%] pb-7 pt-20 text-[#FDFBF7]">
            <div className="flex flex-col justify-between gap-14 pb-16 md:flex-row">
                <div className="max-w-[260px]">
                    <Link to="/" className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B18A45] font-serif text-2xl text-[#B18A45]">
                            H
                        </span>
                        <span>
                            <strong className="block text-xs tracking-[2px]">
                                HOTELENQUIRY
                            </strong>
                            <small className="block text-[9px] tracking-[3px] text-[#B18A45]">
                                STAYS & EXPERIENCES
                            </small>
                        </span>
                    </Link>

                    <p className="mt-6 text-xs leading-7 text-gray-400">
                        Finding places that make every journey worth remembering.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
                    <div>
                        <h4 className="mb-6 text-[10px] tracking-[2px] text-[#B18A45]">
                            EXPLORE
                        </h4>
                        <div className="flex flex-col gap-4 text-xs text-gray-300">
                            <Link to="/" className="transition hover:text-[#D7B46B]">Discover</Link>
                            <Link to="/hotels" className="transition hover:text-[#D7B46B]">Hotels</Link>
                            <Link to="/#experiences" className="transition hover:text-[#D7B46B]">Experiences</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-6 text-[10px] tracking-[2px] text-[#B18A45]">
                            ABOUT
                        </h4>
                        <div className="flex flex-col gap-4 text-xs text-gray-300">
                            <Link to="/about-contact" className="transition hover:text-[#D7B46B]">Our Story</Link>
                            <Link to="/about-contact" className="transition hover:text-[#D7B46B]">Contact Us</Link>
                            <Link to="/about-contact" className="transition hover:text-[#D7B46B]">Get in Touch</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-6 text-[10px] tracking-[2px] text-[#B18A45]">
                            CONNECT
                        </h4>
                        {/* <div className="flex flex-col gap-4 text-xs text-gray-300">
              <a href="#" className="transition hover:text-[#D7B46B]">Instagram</a>
              <a href="#" className="transition hover:text-[#D7B46B]">LinkedIn</a>
              <a href="mailto:hello@hotel-enquiry.com" className="transition hover:text-[#D7B46B]">Email Us</a>
            </div> */}
                        <div className="flex items-center gap-5">
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/"
                                aria-label="Instagram"
                                className="group relative text-xl transition hover:text-[#D7B46B]"
                            >
                                <FaInstagram />
                                <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#182333] px-3 py-1.5 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                                    Instagram
                                </span>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/"
                                aria-label="LinkedIn"
                                className="group relative text-xl transition hover:text-[#D7B46B]"
                            >
                                <FaLinkedin />
                                <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#182333] px-3 py-1.5 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                                    LinkedIn
                                </span>
                            </a>

                            {/* Email */}
                            <a
                                href="saurav000667@gmail.com"
                                aria-label="Email Us"
                                className="group relative text-xl transition hover:text-[#D7B46B]"
                            >
                                <FaEnvelope />
                                <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#182333] px-3 py-1.5 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                                    Email Us
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-between gap-4 border-t border-gray-700 pt-7 text-[10px] tracking-wider text-gray-400 sm:flex-row">
                <span>© {new Date().getFullYear()} HotelEnquiry. All rights reserved.</span>
                <span>MADE FOR THE LOVE OF TRAVEL.</span>
            </div>
        </footer>
    );
}

export default Footer;
