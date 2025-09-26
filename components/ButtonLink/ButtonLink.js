import Link from "next/link";
import { theme } from "theme";
import { useRouter } from "next/router";

export const ButtonLink = ({
  destination,
  label,
  fullWidth,
  color,
  url,
  openInNewTab,
  transparency,
}) => {
  const router = useRouter(); // Use useRouter to get current routing information

  let href = destination;

  // Check if url exists and current path isn't equal to destination
  if (url && router.pathname !== destination) {
    href = url;
  }

  // Default to primary color if no color is provided
  const buttonColor = color || theme.primary;
  const isTransparent = transparency === "1";

  const linkProps = openInNewTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Link href={href} legacyBehavior>
      <a
        className={`mx-1 my-2 inline-block cursor-pointer rounded-md border-2 px-3 py-2 font-bold uppercase ${
          fullWidth ? "w-full text-center" : ""
        } ${isTransparent ? "hover:bg-opacity-20" : "hover:bg-opacity-10"}`}
        style={{
          color: isTransparent ? buttonColor : "white",
          borderColor: buttonColor,
          backgroundColor: isTransparent ? "transparent" : buttonColor,
          transition: "background-color 0.3s ease",
          whiteSpace: "normal", // Allow wrapping
          overflow: "visible", // Make sure overflow text is visible
          textOverflow: "clip", // Clip the text visually if it overflows
        }}
        {...linkProps}
      >
        {label}
      </a>
    </Link>
  );
};
