import React from "react";

const Map = () => {
    return (
        <div className="mt-16">
            <iframe
                title="Campus Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.481374274091!2d106.66017287480435!3d10.77653035920559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3276c8e5c9%3A0xc40b2d7a7b5d9ad4!2sUniversity!5e0!3m2!1sen!2s!4v1700000000000"
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="rounded-2xl border border-slate-200"
            />
        </div>
    );
};

export default Map;
