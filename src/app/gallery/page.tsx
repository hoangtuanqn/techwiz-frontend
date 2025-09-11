import React from "react";

const images = [
    {
        src: "/james-webb-cosmic-cliffs-8k-sb-1920x1080.jpg",
        alt: "James Webb Cosmic Cliffs",
        caption: "The Cosmic Cliffs – NASA/ESA",
    },
    {
        src: "/james-webb-cosmic-cliffs-8k-sb-1920x1080.jpg",
        alt: "Gallery Image 2",
        caption: "Exploring the Deep Sky",
    },
    {
        src: "/james-webb-cosmic-cliffs-8k-sb-1920x1080.jpg",
        alt: "Gallery Image 3",
        caption: "Galactic Formations",
    },
    {
        src: "/james-webb-cosmic-cliffs-8k-sb-1920x1080.jpg",
        alt: "Gallery Image 4",
        caption: "Nebula Glow",
    },
    {
        src: "/james-webb-cosmic-cliffs-8k-sb-1920x1080.jpg",
        alt: "Gallery Image 5",
        caption: "Star Formation",
    },
    {
        src: "/james-webb-cosmic-cliffs-8k-sb-1920x1080.jpg",
        alt: "Gallery Image 6",
        caption: "Dark Matter View",
    },
];

export default function GalleryPage() {
    return (
        <main className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Hero */}
            <section className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
                    📸 Event Gallery
                </h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    Explore some of our most memorable moments captured during recent events, seminars,
                    and competitions. Dive into the experience!
                </p>
            </section>

            {/* Gallery Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative overflow-hidden rounded-xl group shadow transition duration-300 hover:shadow-xl"
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <p className="text-white text-sm font-medium">{img.caption}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Footer note */}
            <div className="text-center mt-12 text-slate-500 text-sm">
                Want to contribute your own moments? Contact us to feature your images in the gallery.
            </div>
        </main>
    );
}
