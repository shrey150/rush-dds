"use client"

import Image from "next/image"

type Company = { name: string; logo: string } | { name: string; logos: { name: string; logo: string }[] }

const companies: Company[] = [
  { name: "Databricks", logo: "/new_logos/databricks.svg" },
  { name: "DeepMind", logo: "/new_logos/deepmind.png" },
  { name: "Sierra", logo: "/new_logos/sierra.svg" },
  { name: "Cognition", logo: "/new_logos/cognition.svg" },
  { name: "BrowserBase", logo: "/new_logos/browserbase.svg" },
  { name: "AWS-Apple", logos: [
    { name: "AWS", logo: "/new_logos/aws.svg" },
    { name: "Apple", logo: "/new_logos/apple.svg" },
  ]},
  { name: "Y Combinator", logo: "/new_logos/y-combinator.svg" },
  { name: "Jane Street", logo: "/new_logos/jane-street.svg" },
  { name: "OpenAI", logo: "/new_logos/openai.svg" },
  { name: "Meta", logo: "/new_logos/meta.svg" },
  { name: "Ramp", logo: "/new_logos/ramp.svg" },
  { name: "Coinbase", logo: "/new_logos/coinbase.svg" },
  { name: "Block", logo: "/new_logos/block.png" },
  { name: "Rox", logo: "/new_logos/rox.svg" },
  { name: "Microsoft", logo: "/new_logos/microsoft.svg" },
  { name: "Palantir", logo: "/new_logos/palantir.svg" },
  { name: "DoorDash", logo: "/new_logos/doordash.svg" },
  { name: "Citadel Securities", logo: "/new_logos/citadel-securities.svg" },
  { name: "Optiver", logo: "/new_logos/optiver.svg" },
  { name: "Netflix", logo: "/new_logos/netflix.png" },
  { name: "Neo", logo: "/new_logos/neo.png" },
]

const isGrouped = (company: Company): company is { name: string; logos: { name: string; logo: string }[] } => 'logos' in company
const isSingle = (company: Company): company is { name: string; logo: string } => 'logo' in company

const getRowCompanies = (rowIndex: number) => {
  const perRow = Math.ceil(companies.length / 3)
  const start = rowIndex * perRow
  const end = Math.min(start + perRow, companies.length)
  return companies.slice(start, end)
}

const row1 = getRowCompanies(0)
const row2 = getRowCompanies(1)
const row3 = getRowCompanies(2)

const LogoItem = ({ company }: { company: Company }) => {
  if (isGrouped(company)) {
    return (
      <div className="flex items-center gap-3">
        {company.logos.map((item) => (
          <div key={item.name} className="relative h-8 w-20 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-300">
            <Image
              src={item.logo}
              alt={`${item.name} logo`}
              width={80}
              height={32}
              className="max-h-full max-w-full object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
              unoptimized
            />
          </div>
        ))}
      </div>
    )
  }
  
  if (isSingle(company)) {
    const isWide = company.name === 'Meta' || company.name === 'Rox' || company.name === 'DoorDash' || company.name === 'Citadel Securities'
    
    return (
      <div className={`relative h-8 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-300 ${
        isWide ? 'w-40' : 'w-32'
      }`}>
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          width={isWide ? 160 : 128}
          height={32}
          className="max-h-full max-w-full object-contain"
          style={{ filter: 'brightness(0) invert(1)' }}
          unoptimized
        />
      </div>
    )
  }
  
  return null
}

export function LogoCarousel() {
  const duplicatedRow1 = [...row1, ...row1]
  const duplicatedRow2 = [...row2, ...row2]
  const duplicatedRow3 = [...row3, ...row3]

  return (
    <div className="w-full py-6 overflow-hidden">
      <div className="space-y-6">
        {/* Row 1 */}
        <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
          <div className="flex animate-scroll hover:[animation-play-state:paused] will-change-transform">
            {duplicatedRow1.map((company, index) => (
              <div
                key={`row1-${company.name}-${index}`}
                className="flex-shrink-0 px-4 flex items-center justify-center"
              >
                <LogoItem company={company} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - reverse direction */}
        <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
          <div className="flex animate-scroll-reverse hover:[animation-play-state:paused] will-change-transform">
            {duplicatedRow2.map((company, index) => (
              <div
                key={`row2-${company.name}-${index}`}
                className="flex-shrink-0 px-4 flex items-center justify-center"
              >
                <LogoItem company={company} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
          <div className="flex animate-scroll hover:[animation-play-state:paused] will-change-transform">
            {duplicatedRow3.map((company, index) => (
              <div
                key={`row3-${company.name}-${index}`}
                className="flex-shrink-0 px-4 flex items-center justify-center"
              >
                <LogoItem company={company} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
