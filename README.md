
# Superego
**Kunde:** - Superego

**Release:** 2024

**Beskrivelse:** Superego's nye starter til sanity

**Website:** Superego.nu

 ## Tech Stack 

**Client:** React, Next.js, TailwindCSS, TypeScript, Gsap, Framer motion, Lenis, Lottie.js, ukiyo.js, icons.mynaui.com

**Server:** Node, Vercel, Sanity, PartyTown, Turbo

## Installation 
Hent projektet ned fra Github
 ```bash
 npm install
 npm run dev
 ```

 For at teste om der ville kommer server errors kan du kører
 ```bash
 npm run build
 npm run start
 ```
 Test din code for fejl med EsLint 
```bash
npm run lint
npm run lint:fix
```

Formater projektet så koden ser ordenlig ud på alle dokumenter
```bash
npm run format
```
## Color Reference

| Filer             | beskrivelse                                                        | Eksempler
| ----------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| src/components    | Det sted vores components bliver placeret                          | Header.tsx, Footer.tsx, Section.tsx                                | 
| src/lib           | Stedet vi ligger vores libraries                                   | Som Sanity eller en database connection                            | 
| src/pages         | Der vores sider ligger                                             | Forside, sider, artikler, events                                   |
| src/shemas        | Shemas til sanity                                                  | Sider, sections, og singletons                                     |
| src/styles        | Her ligger vi vores styling filer                                  | globas.css                                                         | 
| src/utis          | Her ligger vi vores "utility"                                      | Formatering af datoer og tailwind-merge + clsx                     |


## Support

Spørgsmål? Hiv fat i Kasper Buchholtz kb@superego.nu // +4561302618
