import Link from "next/link";
import Btn from "./Btn";
import Image from "next/image";


const FOOTER_LINKS = {
  Company: [
    { label: "Our Products", href: "/products" },
    { label: "About Us", href: "/about" },
    { label: "Inspiration Zone", href: "/" },
    { label: "Contact Us", href: "/contact" },
  ],
  Social: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" }
  ],
};

export default function Footer() {
  return (
    <>
      <div className="py-20">
        <form action="#" className="max-w-[920px] mx-auto px-5 flex flex-col gap-10 items-center">
          <h2 className="text-2xl text-center">Looking for inspiration?</h2>
          <input type="email" placeholder="Your Email Address" className="text-lg w-full border-0 border-b border-black text-center py-4 outline-none" />
          <Btn size="lg">SIGN UP FOR THE MAILING LIST</Btn>
        </form>
      </div>
      <footer className="bg-black text-white py-20 text-lg">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-col gap-20">
            <div className="flex items-center justify-center gap-6 tablet:flex-col tablet:gap-4">
              <span>For the love of the game</span>
              <Image src="/images/logo.svg" alt="Footer Logo" className="w-auto h-10 invert" width={100} height={100} />
              <span>For the love of the game</span>
            </div>
            <div className="flex items-start justify-between gap-6 tablet:flex-col tablet:gap-10">
              <div>
                <p className="leading-9">FTLOTG Snowboards<br />
                  1 Exeter Place<br />
                  Nottingham<br />
                  <a href="mailto:cs@ftlotg.co.uk">cs@ftlotg.co.uk</a>
                </p>
              </div>
              <div>
                <div className="flex flex-col leading-9">
                  {/* FOOTER_LINKS.company */}
                  {FOOTER_LINKS.Company.map((link) => (
                    <Link href={link.href} key={link.label}>{link.label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex flex-col leading-9">
                  {/* FOOTER_LINKS.social */}
                  {FOOTER_LINKS.Social.map((link) => (
                    <Link href={link.href} key={link.label}>{link.label}</Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center">
              <span>Website by Imaginaire</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
