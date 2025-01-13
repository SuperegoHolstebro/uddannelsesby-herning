import Link from "next/link";
import Appconfig from "config";
import { AppConfigLocales, LanguageProps, ExtendedLanguage } from "@/types/LocaleSwitcher.types";
import Heading from "./Heading";
import { cva, VariantProps } from "class-variance-authority";
import { resolveHrefLang } from "~/sanity/lib/sanity.links";
import { cn } from "~/utils/utils";

/**
 *
 * @returns: En LocaleSwitcher-komponent der skifter mellem forskellige sprog
 * @example: <LocaleSwitcher locale={locale} />
 * @summary: Denne komponent bruges til at skifte mellem forskellige sprog på siden ved at navigere til en anden URL
 * @version: 1.0.0
 * @property: [locale]
 * @autor: Kasper Buchholtz
 *
 **/

const LocaleSwitcherVariants = cva('group/languageSwitcher my-auto w-fit', {
    variants: {
        position: {
            absolute: 'absolute',
            relative: 'relative',
        },
        view: {
            mobile: 'sm:hidden',
            desktop: 'hidden sm:block',
            default: ''
        },
    },

    defaultVariants: {
        position: 'relative',
        view: 'default',
    },
})

type ExtendLanguageProps = LanguageProps & VariantProps<typeof LocaleSwitcherVariants> & {
    className?: string;
};

const LocaleSwitcher = ({ locale, position, className, view }: ExtendLanguageProps) => {
    // Sort locales to ensure Danish is first
    const sortedLocales = [...Appconfig.i18n.locales].sort((a, b) => {
        if (a.id === 'da') return -1;
        if (b.id === 'da') return 1;
        if (a.id < b.id) return -1;
        return 0;
    });

    // Find the next language in the sorted locales
    const getNextLocale = (currentLocale: string): AppConfigLocales => {
        const currentIndex = sortedLocales.findIndex(locale => locale.id === currentLocale);
        const nextIndex = (currentIndex + 1) % sortedLocales.length;
        return sortedLocales[nextIndex];
    };

    const handleLanguageToggle = () => {
        const nextLocale = getNextLocale(locale.locale);
        const href = resolveHrefLang(nextLocale.id);
        window.location.href = href; // Navigate to the URL of the next locale
    };

    return (
        <button
            onClick={handleLanguageToggle}
            className={cn(
                className,
                LocaleSwitcherVariants({
                    position,
                    view,
                }),
                "px-4 py-2 bg-superego-dark text-white rounded hover:bg-superego-dark/80 transition-all"
            )}
            title="Skift sprog"
        >
                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.75195 20.4669H37.2484" stroke="#D9FC00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M26.6341 20.4669C26.3082 26.7744 23.985 32.8148 20.0001 37.7151C16.0153 32.8148 13.6921 26.7744 13.3662 20.4669C13.6921 14.1594 16.0153 8.11892 20.0001 3.2187C23.985 8.11892 26.3082 14.1594 26.6341 20.4669Z" stroke="#D9FC00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.0002 37.7151C29.5262 37.7151 37.2484 29.993 37.2484 20.4669C37.2484 10.941 29.5262 3.2187 20.0002 3.2187C10.4742 3.2187 2.75195 10.941 2.75195 20.4669C2.75195 29.993 10.4742 37.7151 20.0002 37.7151Z" stroke="#D9FC00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>

        </button>
    );
};

export default LocaleSwitcher;
