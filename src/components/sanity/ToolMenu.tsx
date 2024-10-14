import { ToolLink, ToolMenuProps, useWorkspace } from 'sanity'
import { Button, Flex } from '@sanity/ui'
import { PlugIcon } from '@sanity/icons'

export function CustomToolMenu(props: ToolMenuProps) {
  const { activeToolName, context, tools } = props
  const isSidebar = context === 'sidebar'

  // Change flex direction depending on context
  const direction = isSidebar ? 'column' : 'row'

  // Filter out the tool with the title "Schedules"
  const filteredTools = tools.filter(tool => tool.title !== 'Schedules')

  return (
    <Flex gap={1} direction={direction}>
      {filteredTools.map((tool) => (
          <Button
            as={ToolLink}
            classID={tool.title}
            icon={tool.icon || PlugIcon}
            key={tool.name}
            name={tool.name}
            padding={2}
            selected={tool.name === activeToolName}
            text={(tool.title === 'Media' ? 'Medier' : tool.title)}
            tone="positive"
          />
      ))}
    </Flex>
  )
}
