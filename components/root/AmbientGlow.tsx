type GlowBlob = {
  size: number;
  top: string;
  left?: string;
  right?: string;
  opacity: number;
  blur: number;
};

const blobs: GlowBlob[] = [
  { size: 480, top: "0%", left: "10%", opacity: 0.2, blur: 100 },
  { size: 220, top: "4%", left: "34%", opacity: 0.16, blur: 65 },
  { size: 540, top: "18%", right: "2%", opacity: 0.22, blur: 120 },
  { size: 260, top: "12%", left: "62%", opacity: 0.14, blur: 70 },
  { size: 320, top: "30%", left: "22%", opacity: 0.16, blur: 85 },
  { size: 200, top: "34%", right: "34%", opacity: 0.14, blur: 60 },
  { size: 300, top: "40%", left: "52%", opacity: 0.14, blur: 80 },
  { size: 400, top: "52%", left: "4%", opacity: 0.2, blur: 95 },
  { size: 240, top: "48%", right: "8%", opacity: 0.16, blur: 65 },
  { size: 260, top: "60%", right: "22%", opacity: 0.16, blur: 65 },
  { size: 340, top: "64%", left: "42%", opacity: 0.14, blur: 85 },
  { size: 220, top: "70%", left: "12%", opacity: 0.16, blur: 65 },
  { size: 460, top: "76%", right: "6%", opacity: 0.2, blur: 100 },
  { size: 280, top: "90%", left: "38%", opacity: 0.14, blur: 75 },
  { size: 240, top: "86%", right: "38%", opacity: 0.14, blur: 65 },
  { size: 380, top: "98%", left: "6%", opacity: 0.18, blur: 90 },
];

/**
 * Decorative, non-interactive radial glow blobs meant to sit behind a page's
 * content (see app/(root)/page.tsx). Positions are percentage-based so they
 * scale with whatever page height they're dropped into.
 */
export default function AmbientGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="bg-primary absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            opacity: blob.opacity,
            filter: `blur(${blob.blur}px)`,
          }}
        />
      ))}
    </div>
  );
}
