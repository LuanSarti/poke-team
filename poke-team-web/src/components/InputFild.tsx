"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Iprops {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
}

export default function InputFild({
  id,
  label,
  type = "text",
  defaultValue = "",
}: Iprops) {
  return (
    <div className="relative mt-8">
      <Input
        className="rounded bg-neutral-600"
        placeholder={id}
        type={type}
        name={id}
        id={id}
        defaultValue={defaultValue}
      />
      <Label
        className="animation absolute left-2 top-2 text-base opacity-60"
        htmlFor={id}
      >
        {label}
      </Label>
    </div>
  );
}
