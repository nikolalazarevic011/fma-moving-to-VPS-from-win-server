import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useIsMobile } from "utils/useIsMobile";

export const AcfVideo = ({
  src,
  poster,
  controls,
  autoplay,
  loop = true,
  className = "",
  muted = true,
  heightProp,
  isEmbed,
  ...props
}) => {
  const isMobile = useIsMobile();
  const videoRef = useRef(null);
  const numericHeight = Number(heightProp);

  const showControls = () => controls !== "0";
  const showAutoplay = () => autoplay !== "0";

  // Helper function to extract YouTube video ID from URL
  const extractVideoID = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Calculate responsive height based on mobile state and numeric height
  const responsiveHeight =
    !isMobile || numericHeight < 400
      ? `${heightProp}px` // Use full height on non-mobile
      : `${heightProp / 2}px`; // Use half height on mobile

  const stylesIframe = {
    height: responsiveHeight,
    width: isMobile ? "370px" : "1118px",
  };

  const styles = {
    height: responsiveHeight,
    objectFit: "cover",
    width: "100%",
  };

  // Convert string "1" or "0" to boolean
  const embed = isEmbed === "1";

  // Modify video behavior for mobile banner
  useEffect(() => {
    if (videoRef.current && isMobile) {
      const video = videoRef.current;

      // Prevent full-screen on mobile
      video.addEventListener("webkitfullscreenchange", (e) => {
        e.preventDefault();
        if (document.webkitFullscreenElement) {
          document.webkitCancelFullScreen();
        }
      });

      // Autoplay and loop
      video.play().catch((error) => {
        console.log("Autoplay was prevented", error);
      });
    }
  }, [isMobile]);

  // Render video or iframe based on `isEmbed`
  const renderVideoContent = () => {
    if (embed) {
      const videoId = extractVideoID(src);
      const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay === "1" ? "1" : "0"}&loop=${loop ? "1" : "0"}&playlist=${videoId}&playsinline=1`;
      return (
        <iframe
          src={iframeSrc}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={stylesIframe}
          className="object-cover w-full h-full pb-5 mx-auto"
        />
      );
    } else {
      return (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls={showControls()}
          autoPlay={showAutoplay()}
          loop={loop}
          muted={muted}
          playsInline
          disablePictureInPicture
          style={styles}
          className={`mx-auto h-full w-full object-cover ${className}`}
          {...props}
        >
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return isMobile !== undefined ? (
    <div className="relative w-full overflow-hidden">
      {renderVideoContent()}
    </div>
  ) : null;
};
