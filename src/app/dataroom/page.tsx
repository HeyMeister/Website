import { Container } from "@/components/ui/layout";
import { FileIcon } from "@/components/icons";
import { requireProfile } from "@/lib/dataroom/auth";
import { groupByCategory, listAccessibleDocuments } from "@/lib/dataroom/documents";
import { formatBytes } from "@/lib/dataroom/rules";
import { isDataroomConfigured } from "@/lib/dataroom/supabase";
import { formatDate } from "@/lib/format";
import { SetupNotice } from "./SetupNotice";

export const metadata = { title: "Dokumente" };

export default async function DataroomHomePage() {
  if (!isDataroomConfigured()) return <SetupNotice />;
  const profile = await requireProfile();
  const docs = await listAccessibleDocuments(profile);
  const groups = groupByCategory(docs);
  const firstName = profile.full_name.split(" ")[0];

  return (
    <Container className="py-12 sm:py-16">
      <p className="label text-accent-dark">Datenraum{profile.company ? ` · ${profile.company}` : ""}</p>
      <h1 className="mt-3 text-heading text-ink lg:text-display-l">Guten Tag{firstName ? `, ${firstName}` : ""}</h1>
      <p className="mt-3 max-w-prose text-ink-muted">
        Hier finden Sie die Unterlagen, die wir für Sie freigegeben haben. Bitte behandeln Sie alle Inhalte vertraulich
        und geben Sie Ihre Zugangsdaten nicht weiter.
        {profile.expires_at && <> Ihr Zugang ist gültig bis {formatDate(profile.expires_at)}.</>}
      </p>

      {groups.length === 0 ? (
        <p className="mt-10 rounded-card border border-line bg-surface-raised p-6 text-ink-muted">
          Für Sie sind noch keine Dokumente freigegeben.
        </p>
      ) : (
        <div className="mt-10 space-y-10">
          {groups.map(([category, items]) => (
            <section key={category} aria-labelledby={`cat-${category}`}>
              <h2 id={`cat-${category}`} className="text-subheading text-ink">
                {category}
              </h2>
              <ul className="mt-4 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface-raised">
                {items.map((d) => (
                  <li key={d.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-base text-white">
                      <FileIcon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-ink">{d.title}</p>
                      {d.description && <p className="mt-0.5 text-small text-ink-muted">{d.description}</p>}
                      <p className="mt-1 font-mono text-[0.75rem] leading-4 text-ink-muted">
                        {d.file_name} · {formatBytes(d.size_bytes)} · {formatDate(d.created_at)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`/dataroom/files/${d.id}?mode=view`}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex min-h-[44px] items-center rounded-control border border-base px-4 text-small font-semibold text-ink hover:bg-surface-2"
                      >
                        Ansehen<span className="sr-only">: {d.title} (neuer Tab)</span>
                      </a>
                      <a
                        href={`/dataroom/files/${d.id}?mode=download`}
                        className="inline-flex min-h-[44px] items-center rounded-control bg-base px-4 text-small font-semibold text-white hover:bg-base-light"
                      >
                        Herunterladen<span className="sr-only">: {d.title}</span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </Container>
  );
}
