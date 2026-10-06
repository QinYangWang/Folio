"use client";

import { TagGroup, TagList, Tag } from "@/ui/tag-group";
import { Label } from "@/ui/label";
import { Button } from "@/ui/button";
import { useState } from "react";

export default function Example() {
  const [tags, setTags] = useState(["React", "TypeScript", "Design"]);
  return (
    <TagGroup
      onRemove={(keys) => setTags(tags.filter((tag) => !keys.has(tag)))}
    >
      <Label>Skills</Label>
      <TagList items={tags.map((id) => ({ id }))}>
        {(item) => (
          <Tag textValue={item.id}>
            {item.id}
            <Button
              slot="remove"
              variant="ghost"
              className="size-6 min-h-6 p-0"
            >
              ×
            </Button>
          </Tag>
        )}
      </TagList>
    </TagGroup>
  );
}
