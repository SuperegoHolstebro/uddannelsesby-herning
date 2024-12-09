'use client'
import { Box, Grid, Stack } from '@sanity/ui'
import React, { useState } from 'react'
import { PatchEvent, set } from 'sanity'
import Icon from '@/components/atoms/Icons'
const IconPickerInput = ({ value, onChange }) => {
  const icons = [
    { title: 'Træ', value: 'tree' },
    { title: 'Bølge', value: 'wave' },
    { title: 'Kalender', value: 'calendar' },
    { title: 'Ur', value: 'clock' },
    { title: 'Vejskilt', value: 'streetSign' },
    { title: 'Billetter', value: 'tickets' },
    { title: 'Sport', value: 'sport' },
    { title: 'Palette', value: 'palette' },
    { title: 'Tavle', value: 'board' },
    { title: 'Restaurant', value: 'restaurant' },
    { title: 'Bar', value: 'bar' },
    { title: 'Fitness', value: 'fitness' },
    { title: 'Shopping', value: 'shopping' },
    { title: 'Kort', value: 'map' },
  ]

  const [searchQuery, setSearchQuery] = useState('')

  const handleClick = (value: string) => {
    onChange(PatchEvent.from(set(value)))
  }

  const filteredIcons = icons.filter((icon) =>
    icon.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Stack space={3}>
      <Box>
        <input
          type="text"
          className="w-full"
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <Box>
        <Grid
          columns={5}
          gap={2}
          className="*:border *:border-dark/20 *:rounded"
        >
          {filteredIcons.map((icon) => (
            <button
              key={icon.value}
              className={`mx-auto icon p-1.5 bg-white transition-all hover:bg-green w-full ${icon.value} ${
                value === icon.value ? 'selected shadow-md !bg-green ' : ''
              }`}
              onClick={() => handleClick(icon.value)}
            >
              <Icon className="w-full mx-auto" type={icon.value} />
              <span className="block w-full mx-auto text-center">
                {icon.title}
              </span>
            </button>
          ))}
        </Grid>
      </Box>
    </Stack>
  )
}

export default IconPickerInput
