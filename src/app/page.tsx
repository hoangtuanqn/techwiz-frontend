import React from "react";

import Hero from "./_components/Hero";
import Features from "./_components/Features";
<<<<<<< HEAD
// import Categories from "./_components/Categories";
import Stats from "./_components/Stats";
=======
>>>>>>> f9ce292e0507ccee7e7819f4f1e9ce3a09c5b236
import Testimonials from "./_components/Testimonials";
import Blogs from "./_components/Blogs";
import Cta from "./_components/Cta";
import UpcomingEvents from "./_components/UpcomingEvents";
import NewLetter from "./_components/NewLetter";
export default function Home() {
    return (
        <>
            {/* HERO */}
            <Hero />

            {/* FEATURES */}
            <Features />

            {/* CATEGORIES */}
            {/* <Categories /> */}

            {/* UPCOMING EVENTS */}
            <UpcomingEvents />

            {/* TESTIMONIALS */}
            <Testimonials />

            {/* BLOG + NEWSLETTER */}
            <Blogs />

            {/* Newsletter */}
            <NewLetter />

            {/* CTA */}
            <Cta />
        </>
    );
}
