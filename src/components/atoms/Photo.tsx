import Image from 'next/image'
import { urlFor } from '@/sanity/lib/sanity.image'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/utils'

/**
 *
 * @returns: En Photo-komponent til at vise billeder. på en mere effektiv måde.
 * @example: <Photo image={image} height={1080} width={1920} objectFit="cover" className="p-20" />
 * @alias: Photo
 * @summary: Denne komponent bruges til at vise billeder på en mere effektiv måde.
 * @version: 1.0.0
 * @property: [image, width, height, objectFit, className]
 * @author: Emilie
 *
 **/

const PhotoVariants = cva('w-full h-full', {
  variants: {
    objectFit: {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
    },
  },
  defaultVariants: {
    objectFit: 'cover',
  },
})

type PhotoProps = VariantProps<typeof PhotoVariants> & {
  image: any
  width?: number
  height?: number
  className?: string
  [key: string]: any
}

const Photo = ({
  image,
  width,
  height,
  objectFit,
  className = '',
  ...props
}: PhotoProps) => {
  return (
    <Image
      {...props}
      className={cn(
        PhotoVariants({
          objectFit,
          className,
        }),
      )}
      src={urlFor(image)?.dpr(2)?.url()}
      alt={
        image?.asset?.altText ||
        image?.asset?.description ||
        image?.asset?.title ||
        'Billede'
      }
      width={width || image?.asset?.metadata?.dimensions?.width || 1920}
      height={height || image?.asset?.metadata?.dimensions?.height || 1080}
      placeholder="blur"
      blurDataURL={urlFor(image).width(24).height(24).blur(10).url()}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
    />
  )
}

export default Photo
