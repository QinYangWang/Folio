"use client";

import {
  Slider,
  SliderTrack,
  SliderThumb,
  SliderOutput,
  SliderFill,
} from "@/ui/slider";
import { Label } from "@/ui/label";

export default function Example() {
  return (
    <Slider defaultValue={40} className="w-64">
      <div className="flex justify-between">
        <Label>Volume</Label>
        <SliderOutput />
      </div>
      <SliderTrack>
        <SliderFill />
        <SliderThumb />
      </SliderTrack>
    </Slider>
  );
}
