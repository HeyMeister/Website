import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/dataroom/auth";
import { formatBytes, isProfileUsable, type DocumentRow, type Profile } from "@/lib/dataroom/rules";
import { createAdminClient, isDataroomConfigured, supabasePublishableKey, supabaseUrl } from "@/lib/dataroom/supabase";
import { formatDate } from "@/lib/format";
import { SetupNotice } from "../SetupNotice";
import { CreateInvestorForm } from "./CreateInvestorForm";
import { InvestorActions } from "./InvestorActions";
import { UploadForm } from "./UploadForm";
import { DocumentActions } from "./DocumentActions";

export const metadata = { title: "Verwaltung" };

const TABS = [
  { id: "investoren", label: "Zugänge" },
  { id: "dokumente", label: "Dokumente" },
  { id: "aktivitaet", label: "Aktivität" },
] as const;
type TabId = (typeof TABS)[number]["id"];

type EventRow = {
  id: number;
  action: string;
  created_at: string;
  profile_id: string | null;
  document_id: string | null;
};

const ACTION_LABELS: Record<string, string> = {
  login: "Anmeldung",
  view: "Angesehen",
  download: "Heruntergeladen",
  upload: "Hochgeladen",
  delete: "Gelöscht",
  invite: "Zugang angelegt",
  reset: "Passwort neu gesetzt",
  block: "Zugang gesperrt",
  unblock: "Zugang entsperrt",
};

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  if (!isDataroomConfigured()) return <SetupNotice />;
  const me = await requireAdmin();
  const { tab: rawTab } = await searchParams;
  const tab: TabId = TABS.some((t) => t.id === rawTab) ? (rawTab as TabId) : "investoren";

  const db = createAdminClient();
  const [{ data: profiles }, { data: documents }, { data: access }, { data: events }] = await Promise.all([
    db.from("dataroom_profiles").select("*").order("created_at", { ascending: false }),
    db.from("dataroom_documents").select("*").order("category").order("created_at", { ascending: false }),
    db.from("dataroom_document_access").select("document_id,profile_id"),
    db.from("dataroom_events").select("id,action,created_at,profile_id,document_id").order("created_at", { ascending: false }).limit(500),
  ]);

  const people = (profiles ?? []) as Profile[];
  const docs = (documents ?? []) as DocumentRow[];
  const grants = (access ?? []) as Array<{ document_id: string; profile_id: string }>;
  const log = (events ?? []) as EventRow[];
  const investors = people.filter((p) => p.role === "investor");
  const nameById = new Map(people.map((p) => [p.id, p.company ? `${p.full_name} (${p.company})` : p.full_name]));
  const titleById = new Map(docs.map((d) => [d.id, d.title]));
  const usage = new Map<string, { views: number; downloads: number }>();
  for (const e of log) {
    if (!e.profile_id || (e.action !== "view" && e.action !== "download")) continue;
    const u = usage.get(e.profile_id) ?? { views: 0, downloads: 0 };
    if (e.action === "view") u.views++;
    else u.downloads++;
    usage.set(e.profile_id, u);
  }

  return (
    <Container className="py-12 sm:py-16">
      <p className="label text-accent-dark">Verwaltung</p>
      <h1 className="mt-3 text-heading text-ink lg:text-display-l">Datenraum verwalten</h1>

      <nav aria-label="Bereiche" className="mt-8 flex gap-1 border-b border-line">
        {TABS.map((t) => (
          <Link
            key={t.id}
            href={`/dataroom/admin?tab=${t.id}`}
            aria-current={tab === t.id ? "page" : undefined}
            className={`-mb-px border-b-2 px-4 py-3 text-small font-semibold ${
              tab === t.id ? "border-accent text-ink" : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      {tab === "investoren" && (
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <section className="lg:col-span-4" aria-labelledby="new-investor">
            <h2 id="new-investor" className="text-subheading text-ink">
              Neuer Zugang
            </h2>
            <div className="mt-4 rounded-card border border-line bg-surface-raised p-6">
              <CreateInvestorForm />
            </div>
          </section>
          <section className="lg:col-span-8" aria-labelledby="investor-list">
            <h2 id="investor-list" className="text-subheading text-ink">
              Zugänge ({people.length})
            </h2>
            <ul className="mt-4 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface-raised">
              {people.map((p) => {
                const usable = isProfileUsable(p);
                const u = usage.get(p.id);
                return (
                  <li key={p.id} className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-ink">
                          {p.full_name}
                          {p.company && <span className="font-normal text-ink-muted"> · {p.company}</span>}
                        </p>
                        <p className="font-mono text-data text-ink-muted">{p.email}</p>
                        <p className="mt-1 text-small text-ink-muted">
                          {p.role === "admin" ? "Admin" : "Investor"}
                          {" · "}
                          {p.last_login_at ? `Zuletzt angemeldet ${formatDateTime(p.last_login_at)}` : "Noch nicht angemeldet"}
                          {u && ` · ${u.views} angesehen, ${u.downloads} heruntergeladen`}
                          {p.expires_at && ` · gültig bis ${formatDate(p.expires_at)}`}
                        </p>
                        {p.note && <p className="mt-1 text-small text-ink-muted">Notiz: {p.note}</p>}
                      </div>
                      <span
                        className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[0.8125rem] font-semibold leading-4 ${
                          usable ? "bg-success-soft text-success" : "bg-danger-soft text-danger"
                        }`}
                      >
                        {usable ? "Aktiv" : p.active ? "Abgelaufen" : "Gesperrt"}
                      </span>
                    </div>
                    {p.id !== me.id && <InvestorActions id={p.id} name={p.full_name} active={p.active} />}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}

      {tab === "dokumente" && (
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <section className="lg:col-span-5" aria-labelledby="upload">
            <h2 id="upload" className="text-subheading text-ink">
              Dokument hochladen
            </h2>
            <div className="mt-4 rounded-card border border-line bg-surface-raised p-6">
              <UploadForm
                supabaseUrl={supabaseUrl}
                supabaseKey={supabasePublishableKey}
                investors={investors.map((i) => ({ id: i.id, label: nameById.get(i.id) ?? i.email }))}
              />
            </div>
          </section>
          <section className="lg:col-span-7" aria-labelledby="doc-list">
            <h2 id="doc-list" className="text-subheading text-ink">
              Dokumente ({docs.length})
            </h2>
            {docs.length === 0 ? (
              <p className="mt-4 rounded-card border border-line bg-surface-raised p-6 text-ink-muted">Noch keine Dokumente.</p>
            ) : (
              <ul className="mt-4 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface-raised">
                {docs.map((d) => {
                  const granted = grants.filter((g) => g.document_id === d.id).map((g) => g.profile_id);
                  return (
                    <li key={d.id} className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-ink">{d.title}</p>
                          <p className="font-mono text-[0.75rem] leading-4 text-ink-muted">
                            {d.category} · {d.file_name} · {formatBytes(d.size_bytes)} · {formatDate(d.created_at)}
                          </p>
                          <p className="mt-1 text-small text-ink-muted">
                            {d.visibility === "all"
                              ? "Sichtbar für alle Investoren"
                              : `Sichtbar für ${granted.length} ausgewählte${granted.length === 1 ? "n Investor" : " Investoren"}`}
                          </p>
                        </div>
                        <a
                          href={`/dataroom/files/${d.id}?mode=view`}
                          target="_blank"
                          rel="noopener"
                          className="text-small font-semibold text-accent-dark underline underline-offset-2 hover:text-ink"
                        >
                          Vorschau
                        </a>
                      </div>
                      <DocumentActions
                        doc={{ id: d.id, title: d.title, category: d.category, visibility: d.visibility }}
                        granted={granted}
                        investors={investors.map((i) => ({ id: i.id, label: nameById.get(i.id) ?? i.email }))}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      )}

      {tab === "aktivitaet" && (
        <section className="mt-8" aria-labelledby="activity">
          <h2 id="activity" className="text-subheading text-ink">
            Letzte Aktivität
          </h2>
          <p className="mt-1 text-small text-ink-muted">Die letzten 500 Ereignisse. Vorschauen durch Admins werden nicht protokolliert.</p>
          <div className="mt-4 overflow-x-auto rounded-card border border-line bg-surface-raised">
            <table className="w-full min-w-[640px] text-left text-small">
              <thead className="border-b border-line bg-surface-2">
                <tr className="label text-ink">
                  <th scope="col" className="px-5 py-3 font-semibold">Zeitpunkt</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Person</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Aktion</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Dokument</th>
                </tr>
              </thead>
              <tbody>
                {log.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-6 text-ink-muted">
                      Noch keine Aktivität.
                    </td>
                  </tr>
                )}
                {log.map((e) => (
                  <tr key={e.id} className="border-b border-line last:border-b-0">
                    <td className="whitespace-nowrap px-5 py-3 font-mono text-data text-ink">{formatDateTime(e.created_at)}</td>
                    <td className="px-3 py-3 text-ink">{e.profile_id ? nameById.get(e.profile_id) ?? "Gelöschter Zugang" : "–"}</td>
                    <td className="px-3 py-3 text-ink">{ACTION_LABELS[e.action] ?? e.action}</td>
                    <td className="px-5 py-3 text-ink-muted">{e.document_id ? titleById.get(e.document_id) ?? "Gelöschtes Dokument" : "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </Container>
  );
}
