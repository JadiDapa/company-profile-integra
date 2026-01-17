import { prisma } from "@/lib/prisma";
import { getTicketByCode } from "@/app/actions/ticket.action";
import AdminTicketActions from "@/components/dashboard/tickets/AdminTicketAction";
import Image from "next/image";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { getUsersByRole } from "@/app/actions/user.actions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EvidenceUploader from "@/components/dashboard/tickets/detail/EvidenceUploader";

function statusBadgeVariant(status?: string) {
  // adjust to your enum values if needed
  switch (status) {
    case "SUBMITTED":
    case "OPEN":
      return "secondary";
    case "IN_PROGRESS":
      return "default";
    case "DONE":
    case "RESOLVED":
      return "outline";
    case "CANCELLED":
      return "destructive";
    default:
      return "secondary";
  }
}

function priorityBadgeVariant(priority?: string) {
  switch (priority) {
    case "HIGH":
    case "URGENT":
      return "destructive";
    case "NORMAL":
      return "secondary";
    case "LOW":
      return "outline";
    default:
      return "secondary";
  }
}

export default async function AdminTicketDetailPage({
  params,
}: {
  params: { code: string };
}) {
  const { code } = await params;

  const ticket = await getTicketByCode(code);
  const technicians = await getUsersByRole("TECHNICIAN");

  if (!ticket) return null;

  const media = await prisma.media.findMany({
    where: { mediaTable: "TICKET", entityId: ticket.id },
    orderBy: { createdAt: "desc" },
  });

  const submissionImages = media.filter((m) => m.mediaType === "SUBMISSION");
  const evidenceImages = media.filter((m) => m.mediaType === "EVIDENCE");

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <Card className="overflow-hidden">
        <CardHeader className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{ticket.code}</CardTitle>
              <p className="text-muted-foreground text-sm">{ticket.reason}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusBadgeVariant(ticket.status)}>
                {ticket.status}
              </Badge>
              <Badge variant={priorityBadgeVariant(ticket.priority)}>
                {ticket.priority}
              </Badge>
              {/* If you have these fields, uncomment:
              {ticket.device?.ssid && (
                <Badge variant="outline">SSID: {ticket.device.ssid}</Badge>
              )}
              */}
            </div>
          </div>

          <Separator />

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="bg-muted/30 rounded-lg border p-3">
              <p className="text-muted-foreground text-xs">Created</p>
              <p className="text-sm font-medium">
                {new Date(ticket.createdAt).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="bg-muted/30 rounded-lg border p-3">
              <p className="text-muted-foreground text-xs">Last Update</p>
              <p className="text-sm font-medium">
                {new Date(ticket.updatedAt).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="bg-muted/30 rounded-lg border p-3">
              <p className="text-muted-foreground text-xs">Evidence</p>
              <p className="text-sm font-medium">{media.length} file(s)</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <p className="mb-1 text-sm font-medium">Detail</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {ticket.detail}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Evidence + Logs */}
        <div className="space-y-6 lg:col-span-2">
          {/* Evidence gallery */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Submission Image</CardTitle>
              <p className="text-muted-foreground text-sm">
                Click an image to preview.
              </p>
            </CardHeader>

            <CardContent>
              {submissionImages.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <p className="text-sm font-medium">
                    No Submission Image Uploaded!
                  </p>
                  <p className="text-muted-foreground text-xs">
                    The User has not uploaded any submission image
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {submissionImages.map((m) => (
                    <Dialog key={m.id}>
                      <DialogTrigger asChild>
                        <button
                          className="group bg-muted/30 relative aspect-square overflow-hidden rounded-xl border text-left"
                          aria-label="Preview evidence"
                        >
                          <Image
                            unoptimized
                            src={getMediaUrl(m.url as string)}
                            alt=""
                            fill
                            className="object-cover transition-transform group-hover:scale-[1.02]"
                          />
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <p className="text-xs text-white">
                              {new Date(m.createdAt).toLocaleString("id-ID")}
                            </p>
                          </div>
                        </button>
                      </DialogTrigger>

                      <DialogContent className="max-w-3xl overflow-hidden p-0">
                        <div className="relative aspect-video bg-black">
                          <Image
                            unoptimized
                            src={getMediaUrl(m.url as string)}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-medium">Evidence</p>
                          <p className="text-muted-foreground text-xs">
                            Uploaded:{" "}
                            {new Date(m.createdAt).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Working Evidences</CardTitle>
              <p className="text-muted-foreground text-sm">
                Click an image to preview.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {ticket.status === "IN_PROGRESS" && (
                <EvidenceUploader
                  ticketId={ticket.id}
                  ticketCode={ticket.code}
                  existingCount={evidenceImages.length}
                />
              )}

              {evidenceImages.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <p className="text-sm font-medium">No evidence uploaded</p>
                  <p className="text-muted-foreground text-xs">
                    Evidence images will appear here once uploaded by
                    technician/admin.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {evidenceImages.map((m) => (
                    <Dialog key={m.id}>
                      <DialogTrigger asChild>
                        <button
                          className="group bg-muted/30 relative aspect-square overflow-hidden rounded-xl border text-left"
                          aria-label="Preview evidence"
                        >
                          <Image
                            unoptimized
                            src={getMediaUrl(m.url as string)}
                            alt=""
                            fill
                            className="object-cover transition-transform group-hover:scale-[1.02]"
                          />
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <p className="text-xs text-white">
                              {new Date(m.createdAt).toLocaleString("id-ID")}
                            </p>
                          </div>
                        </button>
                      </DialogTrigger>

                      <DialogContent className="max-w-3xl overflow-hidden p-0">
                        <div className="relative aspect-video bg-black">
                          <Image
                            unoptimized
                            src={getMediaUrl(m.url as string)}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-medium">Evidence</p>
                          <p className="text-muted-foreground text-xs">
                            Uploaded:{" "}
                            {new Date(m.createdAt).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Logs timeline */}
        </div>

        {/* Right: Admin actions sticky */}
        <div className="space-y-4 lg:col-span-1">
          <AdminTicketActions ticket={ticket} technicians={technicians} />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Activity Logs</CardTitle>
              <p className="text-muted-foreground text-sm">
                Latest updates appear at the bottom.
              </p>
            </CardHeader>

            <CardContent>
              {ticket.logs.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <p className="text-sm font-medium">No logs yet</p>
                  <p className="text-muted-foreground text-xs">
                    Status changes and notes will appear here.
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[472px] pr-3">
                  <div className="space-y-4">
                    {ticket.logs.map((log, idx) => (
                      <div key={log.id} className="relative pl-8">
                        {/* timeline line */}
                        <div className="bg-border absolute top-0 left-3 h-full w-px" />
                        {/* dot */}
                        <div className="bg-background absolute top-2 left-[9px] size-3 rounded-full border" />

                        <div className="rounded-xl border p-3">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <p className="text-sm font-medium">{log.message}</p>
                            <div className="flex items-center gap-2">
                              {log.status && (
                                <Badge variant={statusBadgeVariant(log.status)}>
                                  {log.status}
                                </Badge>
                              )}
                              <span className="text-muted-foreground text-xs">
                                {new Date(log.createdAt).toLocaleString(
                                  "id-ID",
                                )}
                              </span>
                            </div>
                          </div>

                          {/* optional: show "step" */}
                          <p className="text-muted-foreground mt-1 text-xs">
                            Update #{idx + 1}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
