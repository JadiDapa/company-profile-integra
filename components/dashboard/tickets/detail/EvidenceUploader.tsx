"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon } from "lucide-react";

import { createManyMedia } from "@/app/actions/media.action";
import { MediaTable, MediaType } from "@/generated/prisma";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type Props = {
  ticketId: number;
  ticketCode: string;
  existingCount?: number;
};

export default function EvidenceUploader({
  ticketId,
  ticketCode,
  existingCount = 0,
}: Props) {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();

  const canUpload = files.length > 0 && !isPending;

  const totalSelected = files.length;

  const acceptText = useMemo(() => "image/*", []);

  function onPickFiles(list: FileList | null) {
    if (!list) return;

    const incoming = Array.from(list);

    // optional: limit
    const MAX = 12;
    const next = [...files, ...incoming].slice(0, MAX);

    setFiles(next);

    if (incoming.length + files.length > MAX) {
      toast.message(`Max ${MAX} images. Extra files were ignored.`);
    }
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function clearAll() {
    setFiles([]);
  }

  async function upload() {
    if (files.length === 0) {
      toast.error("Please select evidence images first.");
      return;
    }

    startTransition(async () => {
      try {
        await createManyMedia({
          files,
          entityId: ticketId,
          mediaTable: MediaTable.TICKET,
          mediaType: MediaType.EVIDENCE,
          description: "Working Evidence",
          revalidate: `/dashboard/tickets/${ticketCode}`, // adjust to your real path
        });

        toast.success("Evidence uploaded!");
        setFiles([]);
        router.refresh(); // refetch server component data
      } catch (e) {
        toast.error("Failed to upload evidence.");
      }
    });
  }

  return (
    <Card className="border-dashed p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Upload Evidence</p>
            <Badge variant="secondary">{existingCount} existing</Badge>
          </div>
          <p className="text-muted-foreground text-xs">
            Allowed while ticket is{" "}
            <span className="font-medium">IN_PROGRESS</span>. Upload photos of
            field work / installation / repairs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex">
            <input
              type="file"
              id="file-upload"
              accept={acceptText}
              multiple
              className="hidden"
              onChange={(e) => onPickFiles(e.target.files)}
              disabled={isPending}
            />

            <label htmlFor="file-upload">
              <Button
                type="button"
                variant="secondary"
                disabled={isPending}
                asChild
              >
                <span>
                  <ImageIcon className="mr-2 size-4" />
                  Select Images
                </span>
              </Button>
            </label>
          </div>

          <Button type="button" onClick={upload} disabled={!canUpload}>
            <Upload className="mr-2 size-4" />
            {isPending ? "Uploading..." : `Upload (${totalSelected})`}
          </Button>

          {files.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              onClick={clearAll}
              disabled={isPending}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Preview chips */}
      {files.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {files.map((f, idx) => (
            <div
              key={`${f.name}-${idx}`}
              className="bg-muted/30 flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
            >
              <span className="max-w-[180px] truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="hover:bg-muted rounded-full p-1"
                aria-label="Remove file"
                disabled={isPending}
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
