import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Enquiry from "./pages/Enquiry";
import AboutContact from "./pages/AboutContact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHotels from "./pages/admin/AdminHotels";
import AdminHotelForm from "./pages/admin/AdminHotelForm";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import AdminEnquiryDetails from "./pages/admin/AdminEnquiryDetails";
import AdminWebsiteContent from "./pages/admin/AdminWebsiteContent";
import AdminSettings from "./pages/admin/AdminSettings";

const NotFound = () => <h1>404 - Page Not Found</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/about-contact" element={<AboutContact />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/admin" element={<AdminLogin />} />



        {/* admin pages  */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/hotels" element={<AdminHotels />} />
        <Route path="/admin/hotels/new" element={<AdminHotelForm />} />
        <Route path="/admin/hotels/:id/edit" element={<AdminHotelForm />} />
        <Route path="/admin/enquiries" element={<AdminEnquiries />}/>
        <Route path="/admin/enquiries/:id" element={<AdminEnquiryDetails />}/>
        <Route path="/admin/content" element={<AdminWebsiteContent />}/>
        <Route path="/admin/settings" element={<AdminSettings />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;