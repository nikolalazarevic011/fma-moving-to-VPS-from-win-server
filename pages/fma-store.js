//u comm out on 5/12/25

// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { isMobile } from "react-device-detect";

// const FmaStore = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const storeUrl = "https://faith-ministries-alliance-store.company.site/";

//     if (isMobile) {
//       // Open in same tab
//       window.location.href = storeUrl;
//       router.replace("/");
//     } else {
//       // Open in new tab
//       window.open(storeUrl, "_blank");
//       router.replace("/"); // Redirect back to home
//     }
//   }, [router]);

//   return null; // This prevents rendering any unnecessary UI
// };

// export default FmaStore;

//!OLD VERSION - like iframe-to show inside the site- was buggy
/* import Script from "next/script";
import { useEffect } from "react";

const FmaStore = () => {
  const initializeEcwid = () => {
    if (window.xProductBrowser) {
      window.xProductBrowser(
        "categoriesPerRow=3",
        "views=grid(20,3) list(60) table(60)",
        "categoryView=grid",
        "searchView=list",
        "id=my-store-107467269",
      );
    }
  };

  useEffect(() => {
    // Initialize Ecwid store when the component mounts
    initializeEcwid();

    // Ensure Ecwid is re-initialized when returning to the page
    const handleRouteChange = () => {
      initializeEcwid();
    };

    // Listen to route change events
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <>
      <div className="my-5">
        <div id="my-store-107467269">
          <Script
            src="https://app.ecwid.com/script.js?107467269&data_platform=code&data_date=2024-08-14"
            strategy="afterInteractive"
            onLoad={initializeEcwid}
          />
        </div>
      </div>
    </>
  );
};

export default FmaStore;
 */

//new 5.12.25
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getPageStaticProps } from "utils/getPageStaticProps";

const FmaStore = () => {
  const router = useRouter();
  const storeId = "107467269";

  useEffect(() => {
    // Check if we're coming from another page
    const previousPath = sessionStorage.getItem("previousPath");
    const currentPath = router.asPath;

    // If we're coming from a different page, force a reload
    if (
      previousPath &&
      previousPath !== currentPath &&
      currentPath === "/fma-store"
    ) {
      sessionStorage.setItem("previousPath", currentPath);
      window.location.reload();
      return;
    }

    // Store current path
    sessionStorage.setItem("previousPath", currentPath);

    // Initialize Ecwid store
    const initializeStore = () => {
      const script = document.createElement("script");
      script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=2025-05-07`;
      script.async = true;

      script.onload = () => {
        if (window.xProductBrowser) {
          window.xProductBrowser(
            "categoriesPerRow=3",
            "views=grid(20,3) list(60) table(60)",
            "categoryView=grid",
            "searchView=list",
            `id=my-store-${storeId}`,
          );
        }
      };

      document.body.appendChild(script);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeStore, 100);

    // Store route change handler
    const handleRouteChangeStart = (url) => {
      if (url !== "/fma-store") {
        sessionStorage.setItem("previousPath", url);
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      clearTimeout(timer);
      router.events.off("routeChangeStart", handleRouteChangeStart);

      // Clean up Ecwid
      if (window.Ecwid && window.Ecwid.destroy) {
        try {
          window.Ecwid.destroy();
        } catch (e) {
          console.error("Error cleaning up Ecwid:", e);
        }
      }
    };
  }, [router.asPath, router.events]);

  return (
    <div className="mx-auto my-5 max-w-6xl">
      <div id={`my-store-${storeId}`}></div>
    </div>
  );
};

// Add getStaticProps to fetch menu data
export const getStaticProps = getPageStaticProps;

export default FmaStore;
