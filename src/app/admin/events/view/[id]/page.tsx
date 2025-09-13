import React from "react";
import ReviewEvent from "./_components/ReviewEvent";

const ViewEventPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <ReviewEvent id={+id || 0} />;
};

export default ViewEventPage;
