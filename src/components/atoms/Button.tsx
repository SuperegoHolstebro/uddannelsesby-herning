import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/utils'
import React, { type ElementType, type ForwardedRef, forwardRef } from 'react'
import { generateHref } from '@/sanity/schemas/customFields/LinkField/helpers/generateHref'
import { getLinkText } from '@/sanity/schemas/customFields/LinkField/helpers/getLinkText'
import { isCustomLink, isEmailLink, isPhoneLink } from '@/sanity/schemas/customFields/LinkField/helpers/typeGuards'
import { InternalLink, LinkValue } from '@/sanity/schemas/customFields/LinkField/Types'
import { AdvancedButton } from './AdvancedButton'
import { clean } from '~/utils/sanitize'
import Link from 'next/link'

/**
 *
 * @returns: En knap-komponent med brugerdefineret styling
 * @example: 
    * <Button link={}>Knap</Link></Button> 
 * @alias: Button
 * @summary: En knap-komponent med brugerdefineret styling 
 * @version: 1.0.0
 * @property: [link, variant, size]
 * @author: Kasper Buchholtz
 *
**/

type LinkProps = {
    link?: LinkValue
    as?: ElementType
    variant?: 'default' | 'primary' | 'secondary' | 'none'
    hrefResolver?: (link: InternalLink) => string
    size?: 'default' | 'sm' | 'lg' | 'icon' | 'full'
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>

const Button = forwardRef(
    (
        { link, as, hrefResolver, children, variant, className = '', size, ...props }: LinkProps,
        ref: ForwardedRef<HTMLAnchorElement>,
    ) => {
        if (!link) {
            return null
        }

        // If no link text is provided, try and find a fallback
        if (!children) {
            // eslint-disable-next-line no-param-reassign
            children = getLinkText(link)
        }

        return (
            <AdvancedButton
                asChild variant={variant} className={cn(variant, size)}>
                <Link
                    href={clean(
                        String(
                            link.type === 'internal'
                                ? generateHref[link.type]?.(link, hrefResolver)
                                : generateHref[isCustomLink(link) ? 'custom' : link.type]?.(link)
                        )
                    )}
                    target={!isPhoneLink(link) && !isEmailLink(link) && link.blank ? '_blank' : undefined}
                    ref={ref}
                    {...props}
                >
                    {children}
                </Link>
            </AdvancedButton>
        )
    },
)

Button.displayName = 'Button'

export { Button, type LinkProps }
