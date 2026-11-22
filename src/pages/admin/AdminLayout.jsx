import React, { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Hotel, Inbox, FileText, SlidersHorizontal, PanelLeftClose, PanelLeftOpen, Bell, Search, LogOut, Menu, X } from 'lucide-react';

const nav = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/hotels', label: 'Hotels', icon: Hotel },
    { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
    { to: '/admin/content', label: 'Website Content', icon: FileText },
    { to: '/admin/settings', label: 'Settings', icon: SlidersHorizontal },
];

export default function AdminLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const current = nav.find(n => location.pathname.startsWith(n.to)) || nav[0];
    const Sidebar = () => <aside className={`${collapsed ? 'w-[86px]' : 'w-[302px]'} flex h-full shrink-0 flex-col bg-[#182333] text-white transition-all duration-200`}>
        <div className="flex h-[73px] items-center gap-3 border-b border-white/10 px-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#B18A45] font-serif text-2xl text-[#182333]">H</div>
            {!collapsed && <div><div className="font-serif text-[21px] leading-6 tracking-wide">HOTELENQUIRY</div><div className="mt-0.5 text-[11px] font-semibold tracking-[3px] text-[#D7B46B]">ADMIN PORTAL</div></div>}
        </div>
        <nav className="flex-1 space-y-2 px-3 py-5">{nav.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} title={collapsed ? label : ''} className={({ isActive }) => `flex h-12 items-center gap-4 rounded-xl px-4 text-[15px] transition ${isActive ? 'bg-[#26364C] text-[#D7B46B] before:absolute before:left-3 before:h-7 before:w-0.5 before:bg-[#B18A45]' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}><Icon size={20} />{!collapsed && label}</NavLink>)}</nav>
        <div className="border-t border-white/10 p-4"><div className="flex items-center gap-3 rounded-xl bg-white/5 p-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B18A45] font-serif text-[#182333]">AM</div>{!collapsed && <><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">Aarav Malhotra</p><p className="text-xs text-slate-400">Administrator</p></div><Link to="/admin" title="Logout"><LogOut size={17} className="text-slate-400 hover:text-white" /></Link></>}</div></div>
    </aside>;
    return <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#182333]"><div className="flex min-h-screen">
        <div className="hidden lg:block"><div className="fixed inset-y-0 left-0 z-30"><Sidebar /></div></div>
        {mobileOpen && <div className="fixed inset-0 z-50 flex lg:hidden"><button aria-label="Close menu" className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} /><div className="relative h-full"><Sidebar /><button onClick={() => setMobileOpen(false)} className="absolute right-3 top-5 lg:hidden"><X /></button></div></div>}
        <div className={`min-w-0 flex-1 ${collapsed ? 'lg:ml-[86px]' : 'lg:ml-[302px]'}`}>
            <header className="sticky top-0 z-20 flex h-[73px] items-center justify-between border-b border-[#E9E4D9] bg-white/95 px-5 backdrop-blur sm:px-8">
                <div className="flex items-center gap-4"><button className="lg:hidden" onClick={() => setMobileOpen(true)}><Menu size={22} /></button><button className="hidden lg:block" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">{collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}</button><div><p className="text-xs text-[#737A82]">Home <span className="mx-1">›</span> {current.label}</p><h1 className="font-serif text-xl">{current.label}</h1></div></div>
                <div className="flex items-center gap-4"><div className="hidden items-center gap-2 rounded-lg border border-[#E9E4D9] bg-[#FDFBF7] px-3 py-2 md:flex"><Search size={17} className="text-[#737A82]" /><input placeholder="Search hotels, enquiries..." className="w-48 bg-transparent text-sm outline-none" /><kbd className="rounded bg-[#F4F1EA] px-1.5 text-[10px] text-[#737A82]">⌘K</kbd></div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B18A45] font-serif text-white">AM</div></div>
            </header><main className="p-5 sm:p-8">{children}</main>
        </div>
    </div></div>;
}
