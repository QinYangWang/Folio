"use client";

import {
  TokenField,
  TokenInput,
  Token,
  TokenFieldValue,
} from "@/ui/token-field";
import { Label } from "@/ui/label";

export default function Example() {
  return (
    <div className="w-64 max-w-full">
      <TokenField
        defaultValue={
          new TokenFieldValue([
            { type: "text", text: "Ask " },
            { type: "token", text: "@Design", value: "design" },
            { type: "text", text: " about the next release" },
          ])
        }
      >
        <Label>Message</Label>
        <TokenInput>{(segment) => <Token>{segment.text}</Token>}</TokenInput>
      </TokenField>
    </div>
  );
}
