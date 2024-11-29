import React, { useState } from 'react'
import {
  Box,
  Card,
  Stack,
  Text,
  Button,
  Flex,
  Label,
  TextInput,
} from '@sanity/ui'
import { PatchEvent, set, unset } from 'sanity'
import IconPickerInput from './IconPickerInput'
type MapArrayInputProps = {
  value?: any[] // Current value from the Sanity document
  onChange?: (newValue: any[] | undefined) => void // Emit raw value or undefined
}
const MapArrayInput = React.forwardRef(
  (props: MapArrayInputProps, ref: React.RefObject<any>) => {
    const { value = [], onChange } = props
    const [isPlacementMode, setPlacementMode] = useState(false)
    // Add new placement when clicking on the map

    const handleMapClick = (event: React.MouseEvent<SVGElement>) => {
      const svg = (event.target as Element).closest('svg') as SVGSVGElement

      if (!svg) {
        console.error('SVG element not found')
        return
      }

      const pt = svg.createSVGPoint()
      pt.x = event.clientX
      pt.y = event.clientY

      const cursorPoint = pt.matrixTransform(svg.getScreenCTM()?.inverse())
      const newPlacement = {
        _key: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
        x: cursorPoint.x,
        y: cursorPoint.y,
        title: 'New Placement',
        category: '',
        icon: '',
      }

      const updatedValue = [...value, newPlacement]
      console.log('New placement:', newPlacement)
      console.log('Updated value:', updatedValue)

      // Emit a patch event for Sanity
      onChange?.(
        /* @ts-ignore */
        PatchEvent.from(updatedValue.length > 0 ? set(updatedValue) : unset()),
      )
    }

    // Handle field updates
    const handleFieldChange = (index: number, field: string, newValue: any) => {
      if (field === 'x' || field === 'y') {
        if (typeof newValue !== 'number') {
          console.error(`Invalid value for field ${field}:`, newValue)
          return
        }
      }
      const updatedValue = value.map((placement, i) =>
        i === index ? { ...placement, [field]: newValue } : placement,
      )
      // Debug the value
      console.log('Updated Value:', updatedValue)
      // Emit raw updated array
      // onChange?.([...updatedValue])
      onChange?.(
        /* @ts-ignore */
        PatchEvent.from(updatedValue.length > 0 ? set(updatedValue) : unset()),
      )
    }
    // Remove a placement
    const handleRemovePlacement = (index: number) => {
      const updatedValue = value.filter((_, i) => i !== index)
      // Emit updated array or unset if empty
      onChange?.(
        /* @ts-ignore */
        PatchEvent.from(updatedValue.length > 0 ? set(updatedValue) : unset()),
      )

      /* onChange?.(updatedValue.length > 0 ? updatedValue : undefined) */
    }
    return (
      <Stack space={4}>
        <Card
          padding={3}
          radius={2}
          shadow={1}
          style={{ height: '400px', overflow: 'hidden' }}
        >
          <Flex justify="space-between" align="center" paddingBottom={2}>
            <Text size={2} weight="semibold">
              Map Editor
            </Text>
            <Button
              text={isPlacementMode ? 'Disable Placement' : 'Enable Placement'}
              tone={isPlacementMode ? 'critical' : 'primary'}
              onClick={() => setPlacementMode(!isPlacementMode)}
            />
          </Flex>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 1080"
            style={{ width: '100%', height: '100%' }}
            onClick={isPlacementMode ? handleMapClick : undefined}
          >
            <image
              href="/7400-kort.svg"
              x="0"
              y="0"
              width="1920"
              height="1080"
            />
            {value.map((placement) => (
              <circle
                key={placement._key}
                cx={placement.x}
                cy={placement.y}
                r="10"
                fill="red"
              />
            ))}
          </svg>
        </Card>
        <Stack space={3}>
          <Text size={1} weight="semibold">
            Placements
          </Text>
          {value.map((placement, index) => (
            <Card key={placement._key} padding={2} radius={2} shadow={1}>
              <Flex justify="space-between" align="center">
                <Box>
                  <Text weight="bold">{placement.title || 'Untitled'}</Text>
                </Box>
                <Button
                  mode="ghost"
                  tone="critical"
                  text="Remove"
                  onClick={() => handleRemovePlacement(index)}
                />
              </Flex>
              <Box marginTop={3}>
                <Label>X: {placement.x.toFixed(2)}</Label>
                <Label>Y: {placement.y.toFixed(2)}</Label>
              </Box>
              <TextInput
                placeholder="Title"
                value={placement.title}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    'title',
                    (e.target as HTMLInputElement).value,
                  )
                }
              />
              <TextInput
                placeholder="Category"
                value={placement.category}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    'category',
                    (e.target as HTMLInputElement).value,
                  )
                }
              />
              <IconPickerInput
                value={placement.icon}
                onChange={(icon) => handleFieldChange(index, 'icon', icon)}
              />
            </Card>
          ))}
        </Stack>
      </Stack>
    )
  },
)

// Add displayName to the component
MapArrayInput.displayName = 'MapArrayInput'

export default MapArrayInput
