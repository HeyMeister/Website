import { home } from "@/content/home";
import { publishedTeam, type TeamMember } from "@/content/team";
import { Fill, Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/layout";
import Image from "next/image";

/** Brand values plus the responsible master craftsman (only published team members). */
export function MeisterSection({ tone = "muted" }: { tone?: "light" | "muted" }) {
  const p = home.promise;
  const meister = publishedTeam[0];
  return (
    <Section id="ueber-uns" tone={tone} eyebrow={p.eyebrow} title={p.title}>
      <div className="grid gap-12 lg:grid-cols-12">
        <ul className="grid gap-8 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-line">
          {p.values.map((v) => (
            <li key={v.title} className="lg:grid lg:grid-cols-[10rem_1fr] lg:gap-6 lg:py-6 lg:first:pt-0">
              <h3 className="text-subheading text-ink">{v.title}</h3>
              <p className="mt-2 max-w-prose text-ink-muted lg:mt-0">{v.text}</p>
            </li>
          ))}
        </ul>
        {meister && (
          <div className="lg:col-span-5">
            <MeisterCard member={meister} />
          </div>
        )}
      </div>
    </Section>
  );
}

export function MeisterCard({ member }: { member: TeamMember }) {
  return (
    <figure className="rounded-card border border-line bg-surface-raised p-6">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role}`}
          width={480}
          height={600}
          className="aspect-[4/5] w-full rounded-card object-cover"
        />
      ) : (
        <Placeholder label="Foto folgt" aspect="aspect-[4/3]">
          {member.name}
        </Placeholder>
      )}
      {member.quote && (
        <blockquote className="mt-6 text-body text-ink">
          <Fill text={`„${member.quote}“`} />
        </blockquote>
      )}
      <figcaption className="mt-5 border-t border-line pt-4">
        <span className="block font-display text-subheading font-bold text-ink">{member.name}</span>
        <span className="block text-small text-ink-muted">{member.role}</span>
        {member.qualification && (
          <span className="mt-1 block text-small text-ink-muted">
            <Fill text={member.qualification} />
          </span>
        )}
      </figcaption>
    </figure>
  );
}
