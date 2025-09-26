import Image from "next/image";
import { useIsMobile } from "utils/useIsMobile";

export default function MediaText({
  block,
  mediaPosition = "left", // Default to left if not specified
  mediaLink,
  verticalAlignment,
  width,
  height,
  innerBlocks,
  children,
}) {
  const isMobile = useIsMobile();

  // Determine media column placement based on mediaPosition
  const mediaColumnClass = mediaPosition === "left" ? "" : "md:order-last";

  return (
    <div className="mx-auto max-w-7xl px-2 py-5">
      <div
        className={`flex ${!isMobile ? "flex-row" : "flex-col"} items-${verticalAlignment}`}
      >
        {/* Media Container */}
        <div
          className={`sm:mx-6 md:flex-1 ${!isMobile ? mediaColumnClass : ""} ${!isMobile ? "mb-0" : "mb-4"}`}
        >
          <Image
            src={mediaLink}
            width={width}
            height={height}
            alt={`Media for ${block}`}
            // layout="responsive"
          />
        </div>

        {/* Content Container */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
