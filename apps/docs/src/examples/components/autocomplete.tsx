"use client";

import {
  Autocomplete,
  SearchField,
  Input,
  ListBox,
  ListBoxItem,
} from "@/ui/autocomplete";
import { Label } from "@/ui/label";
import { useFilter } from "react-aria-components";

export default function Example() {
  const { contains } = useFilter({ sensitivity: "base" });
  return (
    <Autocomplete filter={contains}>
      <SearchField>
        <Label>Find a framework</Label>
        <Input placeholder="Type to filter" />
      </SearchField>
      <ListBox aria-label="Frameworks" selectionMode="single">
        <ListBoxItem id="react">React</ListBoxItem>
        <ListBoxItem id="vue">Vue</ListBoxItem>
        <ListBoxItem id="svelte">Svelte</ListBoxItem>
      </ListBox>
    </Autocomplete>
  );
}
