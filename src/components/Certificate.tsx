"use client";
import React from "react";
import { Merriweather, Montserrat, Allura } from "next/font/google";

// Font config
const merriweather = Merriweather({
    subsets: ["latin"],
    weight: ["400", "700", "900"],
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const allura = Allura({
    subsets: ["latin"],
    weight: "400",
});

const Certificate = ({
    fullName,
    eventName,
    eventDate,
}: {
    fullName: string;
    eventName: string;
    eventDate: string;
}) => {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
    .certificate {
      width: 1000px;
      aspect-ratio: 4/3;
      background: #fff url('https://www.transparenttextures.com/patterns/paper-fibers.png');
      border: 14px double gold;
      box-shadow: 0 20px 40px rgba(0,0,0,.15);
      padding: 60px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .certificate .seal {
      margin: 30px auto;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid #c0392b;
      background: radial-gradient(circle at 30% 30%, #ffe082, #ff7043);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      color: #7a1c1c;
      font-size: 28px;
      position: relative;
    }
    .certificate .seal::after {
      content: "Certified";
      position: absolute;
      bottom: -28px;
      font-size: 12px;
      color: #7a1c1c;
      font-family: "Montserrat", sans-serif;
      font-weight: 600;
    }
    .certificate .signs {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      padding: 0 40px;
    }
    .certificate .sig {
      text-align: center;
      width: 40%;
    }
    .certificate .sig img {
      height: 60px;
      object-fit: contain;
      margin-bottom: 6px;
    }
    .certificate .sig .rule {
      border-top: 2px solid #aaa;
      margin: 6px 0 5px;
    }
    .certificate .sig .person {
      font-weight: 700;
      color: #c0392b;
      margin-top: 6px;
    }
    .certificate .sig .role {
      font-size: 12px;
      color: #6b7280;
    }
      .certificate .name {
        font-size: 58px;
        margin: 20px 0 10px;
        font-weight: 700;
      }
  `,
                }}
            />
            <div className="certificate">
                <h1 className={merriweather.className}>CERTIFICATE</h1>
                <h2 className={merriweather.className}>of Participation</h2>
                <div className={`${montserrat.className} muted`}>This is proudly presented to</div>
                <div className={`${allura.className} name`}>{fullName}</div>
                <p className={`${montserrat.className} line`}>
                    for actively participating in <strong>{eventName}</strong>.
                </p>
                <p className="date">Date of Participation: {eventDate}</p>
                <div className="seal">★</div>
                <div className="signs">
                    <div className="sig flex flex-col items-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/27/Narf_signature.png"
                            alt="Signature 1"
                        />
                        <div className="rule w-full" />
                        <div className="person">Event Organizer</div>
                        <div className="role">Signature</div>
                    </div>
                    <div className="sig flex flex-col items-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/27/Narf_signature.png"
                            alt="Signature 2"
                        />
                        <div className="rule w-full" />
                        <div className="person">Dean of Faculty</div>
                        <div className="role">Signature</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Certificate;
