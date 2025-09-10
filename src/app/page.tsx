import React from "react";

import Hero from "./_comments/Hero";
import Features from "./_comments/Features";
import Categories from "./_comments/Categories";
import Stats from "./_comments/Stats";
import Testimonials from "./_comments/Testimonials";
import Blogs from "./_comments/Blogs";
import Cta from "./_comments/Cta";
import UpcomingEvents from "./_comments/UpcomingEvents";
import NewLetter from "./_comments/NewLetter";

export default function Home() {
    return (
        <>
            {/* HERO */}
            <Hero />

            {/* FEATURES */}
            <Features />

            {/* CATEGORIES */}
            <Categories />

            {/* UPCOMING EVENTS */}
            <UpcomingEvents />

            {/* STATS */}
            <Stats />

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
