'use client'

import { AddIcon } from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Dialog,
  Grid,
  Heading,
  Stack,
  Text,
} from '@sanity/ui'
import { randomKey } from '@sanity/util/content'
import { useCallback, useMemo, useState } from 'react'
import React from 'react'
import {
  ArrayOfObjectsInputProps,
  BooleanSchemaType,
  FileSchemaType,
  NumberSchemaType,
  ObjectSchemaType,
  ReferenceSchemaType,
  StringSchemaType,
} from 'sanity'

type Schema =
  | BooleanSchemaType
  | FileSchemaType
  | NumberSchemaType
  | ObjectSchemaType
  | StringSchemaType
  | ReferenceSchemaType

const PageBuilderInput = (props: ArrayOfObjectsInputProps) => {
  const { onInsert } = props
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const onClose = useCallback(() => setOpen(false), [setOpen])
  const onOpen = useCallback(() => setOpen(true), [setOpen])

  const onSelectItem = useCallback(
    (schema: Schema) => {
      const key = randomKey(12)
      onInsert({
        items: [
          {
            _type: schema.name,
            _key: key,
          } as any,
        ],
        position: 'after',
        referenceItem: -1,
        open: true,
      })
      onClose()
    },
    [onClose, onInsert],
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredSchemas = useMemo(
    () =>
      props.schemaType.of.filter((schema) =>
        schema.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, props.schemaType.of],
  )

  return (
    <>
      <Stack space={2}>
        {props.renderDefault({
          ...props,
          arrayFunctions: () => {
            return (
              <Button
                onClick={onOpen}
                icon={AddIcon}
                mode="ghost"
                text="Tilføj modul"
                className="!bg-dark/40 hover:!bg-dark prose-span:!text-light-light "
              />
            )
          },
        })}
      </Stack>

      {open && (
        <Dialog
          header="Vælg et modul"
          id="dialog-example"
          width={4}
          onClose={onClose}
          zOffset={1000}
        >
          {/* Search */}
          <Box padding={3}>
            <input
              className="w-full"
              type="text"
              placeholder="Søg"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Box>
          {/* pagebuilder grid */}
          <Box padding={1}>
            <Grid
              autoCols={'auto'}
              columns={[1]}
              autoFlow={'row dense'}
              gap={[3]}
              padding={4}
            >
              {filteredSchemas.map((schema, index) => {
                return (
                  <PreviewCard
                    key={index}
                    schema={schema}
                    onClick={() => onSelectItem(schema)}
                  />
                )
              })}
            </Grid>
          </Box>
        </Dialog>
      )}
    </>
  )
}

type PreviewProps = {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
  schema: Schema
}

function PreviewCard(props: PreviewProps) {
  const { onClick, schema } = props
  return (
    <Card
      role="button"
      shadow={1}
      padding={3}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Stack padding={2} space={[3]}>
        <div
          style={{
            height: '200px',
          }}
        >
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            src={`/images/backend/${schema.name}.png`}
            alt={schema.title}
            onError={(i: any) => (i.target.style.display = 'none')}
          />
        </div>
        <div className="space-y-4">
          <Heading as="h5" size={1}>
            {schema.title}
          </Heading>
          <Text muted>{schema.description}</Text>
        </div>
      </Stack>
    </Card>
  )
}

export default PageBuilderInput
