import Link from "next/link";
import { site } from "@/lib/site";
import { GiglioMark } from "./GiglioMark";

export function Footer() {
  return (
    <footer className="blueprint-dark text-paper">
      <div className="tricolore-rule" />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <GiglioMark className="h-9 w-auto text-viola-bright" />
              <div className="leading-none">
                <div className="text-display text-xl">A.S.D. LAURENZIANA</div>
                <div className="text-label text-paper/50 text-[0.6rem] mt-1">
                  Model Team · Firenze
                </div>
              </div>
            </div>
            <p className="mt-5 text-paper/60 max-w-sm text-sm leading-relaxed">
              {site.section}. Pista permanente RC su asfalto, a Firenze.
              Tracciati riconfigurabili, campionato sociale e F1
              Championship.
            </p>
          </div>

          <div>
            <div className="text-label text-viola-bright mb-4">Naviga</div>
            <ul className="space-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper/70 hover:text-paper transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-label text-viola-bright mb-4">Dove / Contatti</div>
            <address className="not-italic text-paper/70 text-sm space-y-1.5 leading-relaxed">
              <div>{site.address.street}</div>
              <div>
                {site.address.cap} {site.address.city}
              </div>
              <a
                href={`mailto:${site.contacts.email}`}
                className="block pt-2 text-paper/80 hover:text-viola-bright transition-colors break-all"
              >
                {site.contacts.email}
              </a>
              {site.contacts.people.map((p) => (
                <a
                  key={p.phone}
                  href={`tel:${p.phone.replace(/\s/g, "")}`}
                  className="block text-paper/60 hover:text-paper transition-colors"
                >
                  {p.name} · {p.phone}
                </a>
              ))}
            </address>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-paper/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-label text-paper/40">
          <div>© {site.fullName}</div>
          <div className="tabular-nums">{site.domain}</div>
        </div>
      </div>
    </footer>
  );
}
