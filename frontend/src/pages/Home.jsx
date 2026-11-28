
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/ui/Logo";


const services = [
    {
        number: "01",
        name: "Electrical",
        description: "Wiring, installations and electrical repairs.",
        icon: "⚡",
    },
    {
        number: "02",
        name: "Plumbing",
        description: "Leaks, fittings and everyday plumbing work.",
        icon: "🔧",
    },
    {
        number: "03",
        name: "AC Repair",
        description: "Installation, servicing and maintenance.",
        icon: "❄",
    },
    {
        number: "04",
        name: "Carpentry",
        description: "Furniture repairs, fittings and woodwork.",
        icon: "🪚",
    },
    {
        number: "05",
        name: "Painting",
        description: "Interior, exterior and finishing work.",
        icon: "🎨",
    },
    {
        number: "06",
        name: "Appliance Repair",
        description: "Get your household appliances working again.",
        icon: "⚙",
    },
    {
        number: "07",
        name: "Cleaning",
        description: "Professional cleaning for your living space.",
        icon: "✳",
    },
    {
        number: "08",
        name: "Welding",
        description: "Metal fabrication and welding services.",
        icon: "🔥",
    },
];

const steps = [
    {
        number: "01",
        title: "Find your service",
        description:
            "Choose the service you need and discover professionals in your area.",
    },
    {
        number: "02",
        title: "Choose your professional",
        description:
            "Explore technician profiles, experience and customer reviews.",
    },
    {
        number: "03",
        title: "Request a booking",
        description:
            "Send a service request and wait for the technician to respond.",
    },
    {
        number: "04",
        title: "Get it done",
        description:
            "Connect with your technician and get the work completed.",
    },
];

const benefits = [
    {
        number: "01",
        title: "Local professionals",
        description:
            "Discover service providers around your location instead of searching endlessly.",
    },
    {
        number: "02",
        title: "Know who you're hiring",
        description:
            "Review professional profiles, experience and ratings before making a decision.",
    },
    {
        number: "03",
        title: "A simpler process",
        description:
            "From discovery to booking, manage your service requests in one place.",
    },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { label: "Explore services", href: "#services" },
        { label: "How it works", href: "#how-it-works" },
        { label: "For technicians", href: "#technicians" },
    ];

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="relative z-50 border-b border-border bg-surface">
            <nav
                aria-label="Main navigation"
                className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16"
            >
                <Logo className="text-2xl" />

                <div className="hidden items-center gap-9 lg:flex">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-[13px] font-medium text-muted transition-colors hover:text-charcoal"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="hidden items-center gap-7 sm:flex">
                    <Link
                        to="/login"
                        className="text-[13px] font-semibold text-charcoal hover:text-muted"
                    >
                        Sign in
                    </Link>

                    <Link
                        to="/register"
                        className="inline-flex min-h-[44px] items-center gap-3 bg-charcoal px-5 text-[13px] font-semibold text-brand transition-colors hover:bg-[#35413D]"
                    >
                        Get started <span aria-hidden="true">↗</span>
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls="locos-mobile-menu"
                    className="flex h-11 w-11 items-center justify-center border border-border text-charcoal hover:bg-input focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal sm:hidden"
                >
                    <span className="text-[22px]" aria-hidden="true">
                        {menuOpen ? "×" : "☰"}
                    </span>
                </button>
            </nav>

            {menuOpen && (
                <div
                    id="locos-mobile-menu"
                    className="absolute left-0 top-full w-full border-b border-border bg-surface px-5 py-6 shadow-lg sm:hidden"
                >
                    <div className="flex flex-col">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={closeMenu}
                                className="border-b border-border py-4 text-[14px] font-medium text-charcoal"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Link
                            to="/login"
                            onClick={closeMenu}
                            className="flex min-h-[46px] flex-1 items-center justify-center border border-charcoal text-[13px] font-semibold text-charcoal"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            onClick={closeMenu}
                            className="flex min-h-[46px] flex-1 items-center justify-center bg-charcoal text-[13px] font-semibold text-brand"
                        >
                            Get started ↗
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

function SectionLabel({ children }) {
    return (
        <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            <span className="h-[2px] w-7 bg-brand" />
            {children}
        </p>
    );
}

function Home() {
    return (
        <div className="min-h-screen bg-surface text-charcoal">
            <Navbar />

            <main>
                {/* HERO */}
                <section className="bg-input">
                    <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 md:gap-10 md:px-12 lg:px-16 lg:py-20">
                        <div className="max-w-[590px]">
                            <SectionLabel>Skilled hands. Reliable help.</SectionLabel>

                            <h1 className="display-font text-[52px] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-[64px] lg:text-[76px]">
                                Your home deserves
                                <span className="block">the right hands.</span>
                            </h1>

                            <p className="mt-7 max-w-[440px] text-[14px] leading-7 text-muted sm:text-[15px]">
                                From everyday repairs to essential home services, discover
                                skilled local professionals you can count on.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/register"
                                    className="inline-flex min-h-[50px] items-center justify-center gap-4 bg-charcoal px-7 text-[13px] font-semibold text-brand transition-colors hover:bg-[#35413D]"
                                >
                                    Find a professional <span>↗</span>
                                </Link>

                                <a
                                    href="#technicians"
                                    className="inline-flex min-h-[50px] items-center justify-center border border-border px-7 text-[13px] font-semibold text-charcoal transition-colors hover:border-charcoal"
                                >
                                    Join as a technician
                                </a>
                            </div>

                            <div className="mt-12 border-t border-border pt-6">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                                    One place for your home service needs
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] max-h-[560px] overflow-hidden bg-[#E5E8E0]">
                                <img
                                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1100&q=85"
                                    alt="Professional electrician working on a residential electrical installation"
                                    className="h-full w-full object-cover"
                                    fetchPriority="high"
                                />
                            </div>

                            <div className="absolute bottom-5 left-5 bg-surface px-5 py-4 sm:bottom-7 sm:left-7">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                                    The Locos promise
                                </p>
                                <p className="mt-1 text-[14px] font-semibold text-charcoal">
                                    Skilled people. Quality work.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SERVICES */}
                <section id="services" className="scroll-mt-20 py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
                        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div>
                                <SectionLabel>What do you need help with?</SectionLabel>
                                <h2 className="display-font max-w-[650px] text-[42px] font-semibold leading-[1.02] tracking-[-0.025em] sm:text-[52px] lg:text-[60px]">
                                    Find the right service.
                                    <span className="block text-muted">Without the hassle.</span>
                                </h2>
                            </div>

                            <p className="max-w-[330px] text-[14px] leading-7 text-muted">
                                From quick fixes to bigger projects, find professionals for
                                the work your home needs.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
                            {services.map((service) => (
                                <Link
                                    to="/register"
                                    key={service.number}
                                    className="group flex min-h-[210px] flex-col justify-between border-b border-r border-border p-6 transition-colors hover:bg-input sm:p-7"
                                >
                                    <div className="flex items-start justify-between">
                                        <span className="text-[11px] font-medium tabular-nums text-muted">
                                            {service.number}
                                        </span>
                                        <span className="text-[23px]" aria-hidden="true">
                                            {service.icon}
                                        </span>
                                    </div>

                                    <div className="mt-10">
                                        <h3 className="display-font text-[25px] font-semibold text-charcoal">
                                            {service.name}
                                        </h3>
                                        <p className="mt-2 max-w-[230px] text-[12px] leading-6 text-muted">
                                            {service.description}
                                        </p>
                                    </div>

                                    <span className="mt-5 text-[13px] font-semibold text-charcoal transition-transform group-hover:translate-x-1">
                                        Explore service ↗
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section
                    id="how-it-works"
                    className="scroll-mt-20 bg-charcoal py-20 text-white sm:py-24 lg:py-28"
                >
                    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
                        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                            <div>
                                <SectionLabel>Simple by design</SectionLabel>
                                <h2 className="display-font max-w-[480px] text-[46px] font-semibold leading-[1.02] tracking-[-0.025em] sm:text-[58px] lg:text-[68px]">
                                    Getting help should be easy.
                                </h2>
                                <p className="mt-7 max-w-[390px] text-[14px] leading-7 text-[#B7C0BA]">
                                    Finding a professional shouldn't become another problem.
                                    Locos keeps the process straightforward from beginning to
                                    end.
                                </p>

                                <Link
                                    to="/register"
                                    className="mt-9 inline-flex min-h-[48px] items-center gap-4 bg-brand px-6 text-[13px] font-semibold text-charcoal transition-colors hover:bg-[#C8D633]"
                                >
                                    Get started <span>↗</span>
                                </Link>
                            </div>

                            <div className="border-t border-[#46504B]">
                                {steps.map((step) => (
                                    <div
                                        key={step.number}
                                        className="grid grid-cols-[48px_1fr] gap-5 border-b border-[#46504B] py-7 sm:grid-cols-[65px_1fr] sm:py-8"
                                    >
                                        <span className="display-font text-[25px] font-medium text-brand">
                                            {step.number}
                                        </span>
                                        <div>
                                            <h3 className="display-font text-[25px] font-semibold sm:text-[29px]">
                                                {step.title}
                                            </h3>
                                            <p className="mt-2 max-w-[440px] text-[13px] leading-6 text-[#B7C0BA]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY LOCOS */}
                <section className="py-20 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
                        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1100&q=85"
                                    alt="Skilled professional carrying out electrical maintenance work"
                                    loading="lazy"
                                    className="aspect-[5/4] w-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 bg-brand px-6 py-5 sm:px-8">
                                    <p className="display-font text-[25px] font-semibold text-charcoal">
                                        Work done right.
                                    </p>
                                    <p className="mt-1 text-[11px] font-medium text-charcoal">
                                        A better way to find local services.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <SectionLabel>Why Locos</SectionLabel>
                                <h2 className="display-font text-[44px] font-semibold leading-[1.02] tracking-[-0.025em] sm:text-[54px] lg:text-[62px]">
                                    Less searching.
                                    <span className="block text-muted">More getting done.</span>
                                </h2>

                                <div className="mt-10 border-t border-border">
                                    {benefits.map((benefit) => (
                                        <div
                                            key={benefit.number}
                                            className="grid grid-cols-[42px_1fr] gap-4 border-b border-border py-6"
                                        >
                                            <span className="text-[11px] font-semibold text-muted">
                                                {benefit.number}
                                            </span>
                                            <div>
                                                <h3 className="text-[15px] font-semibold text-charcoal">
                                                    {benefit.title}
                                                </h3>
                                                <p className="mt-2 max-w-[420px] text-[13px] leading-6 text-muted">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TECHNICIAN CTA */}
                <section
                    id="technicians"
                    className="scroll-mt-20 bg-input py-20 sm:py-24 lg:py-28"
                >
                    <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 md:grid-cols-2 lg:gap-20 lg:px-16">
                        <div>
                            <SectionLabel>For skilled professionals</SectionLabel>
                            <h2 className="display-font text-[46px] font-semibold leading-[1.02] tracking-[-0.025em] sm:text-[58px] lg:text-[68px]">
                                Your skills deserve
                                <span className="block">more opportunities.</span>
                            </h2>
                            <p className="mt-7 max-w-[430px] text-[14px] leading-7 text-muted">
                                Are you an electrician, plumber, carpenter or service
                                professional? Create your profile and help customers discover
                                your work.
                            </p>

                            <Link
                                to="/register"
                                className="mt-9 inline-flex min-h-[50px] items-center gap-4 bg-charcoal px-7 text-[13px] font-semibold text-brand transition-colors hover:bg-[#35413D]"
                            >
                                Become a Locos technician <span>↗</span>
                            </Link>
                        </div>

                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1100&q=85"
                                alt="Professional tradespeople working on a construction project"
                                loading="lazy"
                                className="aspect-[5/4] w-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="bg-brand py-16 sm:py-20">
                    <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-center lg:px-16">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal/70">
                                Your next repair starts here
                            </p>
                            <h2 className="display-font mt-3 text-[43px] font-semibold leading-[1.02] tracking-[-0.025em] text-charcoal sm:text-[56px]">
                                Let's get it sorted.
                            </h2>
                        </div>

                        <Link
                            to="/register"
                            className="inline-flex min-h-[52px] items-center gap-5 bg-charcoal px-7 text-[13px] font-semibold text-brand transition-colors hover:bg-[#35413D]"
                        >
                            Find a professional <span>↗</span>
                        </Link>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="bg-charcoal text-white">
                <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-16">
                    <div className="grid gap-12 border-b border-[#46504B] pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
                        <div>
                            <Logo className="text-2xl text-white" />

                            <p className="mt-4 max-w-[300px] text-[13px] leading-7 text-[#B7C0BA]">
                                Connecting people with skilled local professionals for
                                everyday home service needs.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand">
                                Explore
                            </h3>
                            <div className="mt-5 flex flex-col gap-4 text-[13px] text-[#B7C0BA]">
                                <a href="#services" className="hover:text-white">Services</a>
                                <a href="#how-it-works" className="hover:text-white">How it works</a>
                                <a href="#technicians" className="hover:text-white">For technicians</a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand">
                                Account
                            </h3>
                            <div className="mt-5 flex flex-col gap-4 text-[13px] text-[#B7C0BA]">
                                <Link to="/login" className="hover:text-white">Sign in</Link>
                                <Link to="/register" className="hover:text-white">Create account</Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-4 pt-7 text-[11px] text-[#A6B0A9] sm:flex-row sm:items-center">
                        <p>© {new Date().getFullYear()} Locos. All rights reserved.</p>
                        <p>Built to connect. Designed to get things done.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
