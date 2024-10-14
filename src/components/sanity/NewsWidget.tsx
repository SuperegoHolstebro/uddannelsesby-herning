import React, { useEffect, useState } from 'react'
import Paragraph from '@/components/atoms/Paragraph'
import Heading from '@/components/atoms/Heading'
import { Spinner } from '@sanity/ui'

const NewsWidget = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/rss')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        setPosts([]) // Handle error by clearing posts or showing an error message
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="h-full p-6 bg-light-0">
      <Heading spacing="default" type="h3" tag="h3" className="font-light">
        Seneste indsigter og nyheder fra dit reklame- og webbureau
      </Heading>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-stretch transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {/* Image on the left, full height */}
              {post.image && (
                <div className="flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    width={150}
                    height={150} // Adjusted to a fixed width to maintain aspect ratio
                    className="object-cover h-full rounded-l-lg" // Full height and cover the entire container
                  />
                </div>
              )}
              {/* Text content on the right */}
              <div className="flex flex-col justify-center pl-4 prose-p:text-grey">
                <Paragraph className="text-sm" spacing="none">
                  {post.category}
                </Paragraph>
                <Heading
                  type="h5"
                  tag="h5"
                  spacing="none"
                  className="font-medium leading-snug"
                >
                  {post.title}
                </Heading>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          <Paragraph>Indlæser data...</Paragraph>
        </div>
      )}

      <div className="mt-6">
        <a
          href="https://superego.nu/indsigter/"
          target="_blank"
          className="gap-4 px-6 py-2 text-sm font-medium transition-colors rounded-full bg-green text-light-light hover:bg-green/90 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          Se alle
        </a>
      </div>
    </div>
  )
}

export default NewsWidget
