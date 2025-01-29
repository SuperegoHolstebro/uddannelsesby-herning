import { SearchIcon } from "@sanity/icons";
import { Box, Card, Flex, TextInput, useGlobalKeyDown } from "@sanity/ui";
import React, { useCallback, useRef } from "react";

import { useNavigator } from "../context";

const SearchBox = (props: { domRef?: React.RefObject<HTMLDivElement> }) => {
  const { searchTerm, handleSearch } = useNavigator();
  const inputRef = useRef<HTMLInputElement>(null);

  // Hotkeys
  const handleGlobalKeyDown = useCallback((event: KeyboardEvent) => {
    if (
      event.key === "f" &&
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey
    ) {
      event.preventDefault();
      inputRef.current?.focus();
    }
  }, []);

  useGlobalKeyDown(handleGlobalKeyDown);

  return (
    <Box paddingBottom={1} paddingX={1} flex={1} ref={props.domRef}>
      <Flex flex={1}>
        <Card as="div" tone="transparent" flex={1}>
          <TextInput
            ref={inputRef}
            aria-label="Superego side navigator input" 
            onChange={(event) => handleSearch(event.currentTarget.value)}
            value={searchTerm}
            placeholder="Søg efter en side eller en mappe"
            border={false}
            fontSize={1}
            icon={SearchIcon}
          />
        </Card>
      </Flex>
    </Box>
  );
};

SearchBox.displayName = "SearchBox";

export default SearchBox;
