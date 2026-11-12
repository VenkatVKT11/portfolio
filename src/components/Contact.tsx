import Image from "next/image";
import { contact, site } from "@/content/site";

/** The ways to reach me. There is no form: visitors use one of these directly. */
const channels = [
  {
    label: "LinkedIn",
    value: site.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
    url: site.linkedin,
    logo: "/logos/linkedin.svg",
    newTab: true,
  },
  {
    label: "GitHub",
    value: site.github.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
    url: site.github,
    logo: "/logos/github.svg",
    newTab: true,
  },
  {
    label: "Email",
    value: site.email,
    url: site.email ? `mailto:${site.email}` : "",
    logo: "/logos/gmail.svg",
    newTab: false,
  },
].filter((channel) => channel.url);

export function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line px-5 py-20 md:px-10 md:py-32">
      <div className="glow glow-blue -right-20 top-24 h-[28rem] w-[28rem]" aria-hidden="true" />
      <div className="glow glow-silver -left-24 bottom-0 h-[22rem] w-[26rem]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-24">
          <div>
            <h2 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.97] tracking-[-0.045em]">
              {contact.heading}
            </h2>
            <p className="mt-6 max-w-[44ch] text-xl text-ink/80">{contact.text}</p>

            {site.resume && (
              <div className="mt-10 border-t border-line pt-7">
                <p className="text-xl text-ink/80">{contact.resumeText}</p>
                <a href={site.resume} download className="btn btn-outline mt-5">
                  Download Resume
                </a>
              </div>
            )}
          </div>

          <ul className="glass rounded-[32px] p-3 md:p-4">
            {channels.map((channel) => (
              <li key={channel.label} className="border-b border-line last:border-b-0">
                <a
                  href={channel.url}
                  target={channel.newTab ? "_blank" : undefined}
                  rel={channel.newTab ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-[22px] px-3 py-4 transition-colors duration-300 hover:bg-white sm:gap-4 sm:px-4 sm:py-5 md:gap-5 md:px-5 md:py-6"
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-line bg-white sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Image src={channel.logo} alt="" width={30} height={30} unoptimized className="h-6 w-6 sm:h-[30px] sm:w-[30px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] text-mute">{channel.label}</span>
                    <span className="block break-all font-display text-[0.9375rem] font-semibold tracking-tight transition-colors duration-300 group-hover:text-blue sm:text-xl md:text-2xl">
                      {channel.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[0.9375rem] text-mute md:mt-24">
          <p>{contact.footer}</p>
          <a href="#top" className="-my-2 inline-block py-2 transition-colors hover:text-ink">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
