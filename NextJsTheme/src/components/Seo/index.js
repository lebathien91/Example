import Head from "next/head";
import { getStrapiMedia } from "@lib/media";

const Seo = ({ seo }) => {
  const fullSeo = {
    ...seo,
    // Add title suffix
    metaTitle: `${seo.metaTitle} | ${seo.siteName}`,
    // Get full image URL
    shareImage: getStrapiMedia(seo.shareImage),
  };

  return (
    <Head>
      <link rel="shortcut icon" href={getStrapiMedia(fullSeo.favicon)} />
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>

          <meta property="og:locale" content="vi_VN" />
          <meta property="og:site_name" content={fullSeo.siteName} />

          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />

          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:secure_url" content={fullSeo.shareImage} />
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.article ? (
        <meta property="og:type" content="article" />
      ) : (
        <meta property="og:type" content="website" />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@InitHTML" />
    </Head>
  );
};

export default Seo;
