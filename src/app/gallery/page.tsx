import React from "react";
import GalleryPage from "./_components/GalleryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gallery",
    description: "Explore our event gallery showcasing memorable moments.",
};
const Gallery = () => {
    return <GalleryPage />;
};

export default Gallery;
