"use client"

import Image from "next/image"

type Company = { name: string; logo: string } | { name: string; logos: { name: string; logo: string }[] }

const companies: Company[] = [
  { name: "Databricks", logo: "/logos/databricks.svg" },
  { name: "DeepMind", logo: "/logos/deepmind.png" },
  { name: "Sierra", logo: "/logos/sierra.svg" },
  { name: "Cognition", logo: "/logos/cognition.svg" },
  { name: "BrowserBase", logo: "/logos/browserbase.svg" },
  { name: "AWS-Apple", logos: [
    { name: "AWS", logo: "/logos/aws.svg" },
    { name: "Apple", logo: "/logos/apple.svg" },
  ]},
  { name: "Y Combinator", logo: "/logos/y-combinator.svg" },
  { name: "Jane Street", logo: "/logos/jane-street.svg" },
  { name: "OpenAI", logo: "/logos/openai.svg" },
  { name: "Meta", logo: "/logos/meta.svg" },
  { name: "Ramp", logo: "/logos/ramp.svg" },
  { name: "Coinbase", logo: "/logos/coinbase.svg" },
  { name: "Block", logo: "/logos/block.png" },
  { name: "Rox", logo: "/logos/rox.svg" },
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "Palantir", logo: "/logos/palantir.svg" },
  { name: "DoorDash", logo: "/logos/doordash.svg" },
  { name: "Citadel Securities", logo: "/logos/citadel-securities.svg" },
  { name: "Optiver", logo: "/logos/optiver.svg" },
  { name: "Netflix", logo: "/logos/netflix.png" },
  { name: "Neo", logo: "/logos/neo.png" },
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
