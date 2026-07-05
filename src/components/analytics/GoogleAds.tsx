import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/gtag";

/**
 * Loads the Google tag (gtag.js) for Google Ads conversion tracking.
 * Renders nothing until NEXT_PUBLIC_GOOGLE_ADS_ID is set, so it's inert by
 * default and adds no scripts to the page before you launch ads.
 */
export function GoogleAds() {
  if (!GOOGLE_ADS_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}
