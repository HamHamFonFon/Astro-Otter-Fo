import { useHead, useSeoMeta } from '@unhead/vue'

export const applySeo = (itemPage) => {
  useHead({
    title: () => 'Astro-Otter - ' + itemPage.title,
    meta: [
      {name: 'title', content: () => 'Astro-Otter - ' + itemPage.title},
      {name: 'description', content: () => itemPage.description },
    ]
  });
  useSeoMeta({
    fbAppId: process.env.VUE_APP_FACEBOOK_APP_ID,
    ogUrl: itemPage.fullUrl,
    ogType: 'website',
    ogTitle: 'Astro-Otter - ' + itemPage.title,
    ogDescription: itemPage.description,
    ogImage: itemPage.image,
    ogImageAlt: itemPage.imageAlt,
    ogLocale: 'eng',
    ogSiteName: 'Astro Otter',
    twitterCard: 'summary_large_image',
    twitterSite: '',
    twitterTitle: 'Astro-Otter - ' + itemPage.title,
    twitterDescription: itemPage.description,
    twitterImage: itemPage.image,
    twitterImageAlt: itemPage.imageAlt
  })
}
