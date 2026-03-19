/**
 * Remote hero imagery (delivery URLs only). On-page captions use fictional
 * Planet staff bylines — no external photographer names in the UI.
 */
import type { ArticleHeroImage } from './types'

function unsplash(
  photoPath: string,
  alt: string,
  /** Shown as "Photo: {name}" in the paper. */
  photoCreditName: string,
): ArticleHeroImage {
  const base = `https://images.unsplash.com/${photoPath}`
  return {
    src: `${base}?auto=format&fit=crop&w=1600&q=85`,
    srcMedium: `${base}?auto=format&fit=crop&w=900&q=82`,
    srcThumb: `${base}?auto=format&fit=crop&w=560&q=80`,
    alt,
    credit: `Photo: ${photoCreditName}`,
  }
}

/** Hero / thumbnail art keyed by article slug. */
export const articleHeroBySlug: Record<string, ArticleHeroImage> = {
  'harbor-district-vote-tonight': unsplash(
    'photo-1494412574643-ff11b0a5c1c3',
    'Container cranes and cargo ships at a commercial port at dusk',
    'Lois Lane',
  ),
  'harbor-automation-clause': unsplash(
    'photo-1553413077-190dd305871c',
    'Shipping containers and cranes at a commercial dock',
    'Lois Lane',
  ),
  'harbor-audit-trail': unsplash(
    'photo-1518391846015-55a9cc003b25',
    'Urban waterfront skyline across a calm harbor',
    'Lois Lane',
  ),
  'lexcorp-grid-study-released': unsplash(
    'photo-1473341304170-971dccb5ac1e',
    'High-voltage electrical towers and power lines at sunset',
    'Clark Kent',
  ),
  'science-brief-stratosphere-balloon': unsplash(
    'photo-1502134249126-9f3755a50d78',
    'Night sky with stars above a dark landscape silhouette',
    'Dr. Jenet Klyburn',
  ),
  'opinion-candor-in-the-newsroom': unsplash(
    'photo-1504711434969-e33886168f5c',
    'Person reading a broadsheet newspaper on a wooden table',
    'Perry White',
  ),
  'world-envoy-arrives-from-kahndaq': unsplash(
    'photo-1521737604893-d14cc237f11d',
    'Two people shaking hands across a table in a professional setting',
    'Catherine Grant',
  ),
  'metro-library-branch-reopens': unsplash(
    'photo-1521587760476-6c12a4b040da',
    'Classical public library exterior with columns and steps',
    'Jimmy Olsen',
  ),
  'sports-metropolis-stars-playoff-push': unsplash(
    'photo-1546519638-68e109498ffc',
    'Indoor basketball arena with hoop and court lighting',
    'Steve Lombard',
  ),
  'science-superconducting-fiber-lab': unsplash(
    'photo-1532094349884-543bc11b234d',
    'Laboratory glassware and scientific equipment on a bench',
    'Dr. Jenet Klyburn',
  ),
  'business-small-bakeries-cooperative': unsplash(
    'photo-1555507036-ab1f4038808a',
    'Fresh bread and pastries cooling on a bakery rack',
    'Clark Kent',
  ),
  'opinion-night-metro-deserves-buses': unsplash(
    'photo-1544620347-c4fd4a3d5957',
    'City bus on a wet street at night with reflections',
    'Cat Grant',
  ),
  'world-gotham-sister-city-renewal': unsplash(
    'photo-1469854523086-cc02fe5d8800',
    'Long suspension bridge spanning a river at golden hour',
    'Catherine Grant',
  ),
  'science-aquifer-monitoring-expansion': unsplash(
    'photo-1506905925346-21bda4d32df4',
    'Layered mountain ridges above a sea of clouds',
    'Dr. Jenet Klyburn',
  ),
  'metro-subway-escalator-repair-blitz': unsplash(
    'photo-1517649763962-0c623066013b',
    'Escalators and modern architecture inside a transit hub',
    'Jimmy Olsen',
  ),
  'metro-farmers-market-license-fees': unsplash(
    'photo-1488459716781-31db52582fe9',
    'Colorful fresh produce laid out at an outdoor market',
    'Jimmy Olsen',
  ),
  'business-riverfront-property-tax-phase-in': unsplash(
    'photo-1514565131-fce0801e5785',
    'Dense city skyline with riverfront towers at dusk',
    'Clark Kent',
  ),
  'world-un-delegate-metropolis-hosts': unsplash(
    'photo-1504384308090-c894fdcc538d',
    'People collaborating at laptops in a bright modern office',
    'Catherine Grant',
  ),
  'science-mosquito-abatement-pilot': unsplash(
    'photo-1441974231531-c6227db76b6e',
    'Sunlight filtering through a lush green forest path',
    'Dr. Jenet Klyburn',
  ),
  'sports-stadium-security-review': unsplash(
    'photo-1574629810360-7efbbe195018',
    'Empty stadium seats in curved rows under lights',
    'Steve Lombard',
  ),
  'opinion-archive-the-print-morgue': unsplash(
    'photo-1481627834876-b7833e8f5570',
    'Shelves of books in a warm, quiet reading room',
    'Perry White',
  ),
  'metro-311-wait-times-improve': unsplash(
    'photo-1521790797524-b2497295b8a0',
    'Customer service headset resting near a laptop',
    'Jimmy Olsen',
  ),
  'business-planet-print-contract-renewed': unsplash(
    'photo-1526304640581-d334cdbbf45e',
    'Financial charts and documents on a desk with a laptop',
    'Clark Kent',
  ),
  'world-themyscira-cultural-exchange': unsplash(
    'photo-1558171813-4c088753af8f',
    'Folded colorful textile fabrics stacked in soft light',
    'Catherine Grant',
  ),
  'science-public-telescope-night': unsplash(
    'photo-1451187580459-43490279c0fa',
    'Earth at night viewed from space with city lights',
    'Dr. Jenet Klyburn',
  ),
  'sports-youth-hoops-finals-pack-siegel': unsplash(
    'photo-1546519638-68e109498ffc',
    'Indoor basketball arena with hoop and court lighting',
    'Steve Lombard',
  ),
  'metro-n-line-signal-audit-opens': unsplash(
    'photo-1517245386807-4b054b13d0cf',
    'Subway tunnel with rails and platform edge lighting',
    'Lois Lane',
  ),
  'metro-n-line-cabin-intercom-fails': unsplash(
    'photo-1544620347-c4fd4a3d5957',
    'Interior of a modern subway car with handrails',
    'Jimmy Olsen',
  ),
  'metro-n-line-dispatchers-senate-testimony': unsplash(
    'photo-1521790797524-b2497295b8a0',
    'Office headset near computer monitors with charts',
    'Lois Lane',
  ),
  'opinion-fund-the-signal-audit': unsplash(
    'photo-1504711434969-e33886168f5c',
    'Newspaper on a wooden table with coffee cup',
    'Perry White',
  ),
  'metro-hive-food-hall-health-scores': unsplash(
    'photo-1551218808-94e220e084d2',
    'Busy food market stalls with signage and warm light',
    'Jimmy Olsen',
  ),
  'business-lois-lane-investigative-fund': unsplash(
    'photo-1450101499163-c8848c66ca85',
    'Laptop with documents and pen on a desk',
    'Clark Kent',
  ),
  'world-atlantis-envoy-water-table': unsplash(
    'photo-1439405326854-014607f694d7',
    'Ocean horizon with gentle waves under soft sky',
    'Catherine Grant',
  ),
  'sports-stars-coach-extension-rumor': unsplash(
    'photo-1574629810360-7efbbe195018',
    'Arena seating and court lighting seen from mid-tier',
    'Steve Lombard',
  ),
  'science-bakerline-soil-lead-pilot': unsplash(
    'photo-1416879595882-3373a0480b5b',
    'Garden soil and green seedlings in soft daylight',
    'Dr. Jenet Klyburn',
  ),
  'metro-snow-brigade-overtime-rules': unsplash(
    'photo-1489515217757-5fd1be406fef',
    'Snow plow truck parked on a city street at dusk',
    'Jimmy Olsen',
  ),
  'opinion-letters-are-first-draft-of-metropolis': unsplash(
    'photo-1524995997946-a121c522fad7',
    'Vintage typewriter and envelopes on a wooden desk',
    'Perry White',
  ),
  'business-airport-terminal-b-expansion': unsplash(
    'photo-1436491865332-7a61a109cc05',
    'Airport terminal windows with airplanes on the tarmac',
    'Clark Kent',
  ),
  'world-bludhaven-ferry-subsidy-deal': unsplash(
    'photo-1559827260-dc66d52befd2',
    'Ferry boat approaching a city dock at blue hour',
    'Catherine Grant',
  ),
  'world-league-ministerial-round-metropolis': unsplash(
    'photo-1446776876762-1236398951d3',
    'Earth at night from orbit with ribbons of city light on continents',
    'Catherine Grant',
  ),
  'world-national-city-mutual-aid-grid-drill': unsplash(
    'photo-1591464920369-22f4ee5d7343',
    'Aerial view of solar panel arrays across a dry landscape',
    'Catherine Grant',
  ),
  'world-central-city-resonance-study-star-labs': unsplash(
    'photo-1534082751284-481edf43bdfe',
    'Heavy storm clouds stacked in a darkening sky over open land',
    'Dr. Jenet Klyburn',
  ),
  'world-star-city-archery-youth-league-expansion': unsplash(
    'photo-1473448912368-24bc0f28123a',
    'Forest trail winding between tall evergreen trees in soft light',
    'Catherine Grant',
  ),
  'world-gotham-observer-corps-harbor-pilot': unsplash(
    'photo-1519681393784-d120267933ba',
    'Misty mountain ridges fading into clouds under a gray sky',
    'Lois Lane',
  ),
  'business-wayne-grid-fast-chargers-pilot': unsplash(
    'photo-1593941707874-ef25b8b4a92b',
    'Electric vehicle charging station in a parking area without people',
    'Clark Kent',
  ),
  'science-amazonium-sample-return-protocols': unsplash(
    'photo-1532187863486-abf9db0307ae',
    'Laboratory glassware and instruments on a stainless bench',
    'Dr. Jenet Klyburn',
  ),
  'world-themyscira-coast-guard-joint-patrol': unsplash(
    'photo-1505142468610-359e7d316be0',
    'Cliff coastline dropping to a rough sea under pale sky',
    'Catherine Grant',
  ),
  'sports-central-city-half-marathon-record': unsplash(
    'photo-1552674605-5d2178b85670',
    'Distance runners seen from behind on a paved course at sunrise',
    'Steve Lombard',
  ),
  'opinion-transparency-charters-for-caped-coalitions': unsplash(
    'photo-1589829549356-61088689957e',
    'Wooden courtroom bench and gavel resting on polished surface',
    'Cat Grant',
  ),
  'world-kahndaq-embassy-night-shift-after-rallies': unsplash(
    'photo-1486406146926-c627a92ad1ab',
    'Modern glass skyscrapers seen looking straight up between towers',
    'Catherine Grant',
  ),
  'world-metro-superman-housing-grants-second-round': unsplash(
    'photo-1460317444681-ccca719e1752',
    'Apartment balconies and brick facade in repeating urban rhythm',
    'Lois Lane',
  ),
}

export function getArticleHero(slug: string): ArticleHeroImage | undefined {
  return articleHeroBySlug[slug]
}
