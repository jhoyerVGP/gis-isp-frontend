import { useEffect, useRef, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

interface SearchInputProps {
  /** Se llama con el texto ya debounced (y al instante al limpiar). */
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
  className?: string;
}

export function SearchInput({
  onChange,
  placeholder = "Buscar...",
  delay = 300,
  className,
}: SearchInputProps) {
  const [text, setText] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Evita disparar onChange si el componente se desmonta con un timer pendiente
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleChange(next: string) {
    setText(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange(next), delay);
  }

  function handleClear() {
    clearTimeout(timer.current);
    setText("");
    onChange("");
  }

  return (
    <InputGroup className={cn("w-full sm:max-w-xs", className)}>
      <InputGroupInput
        value={text}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      {text && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label="Limpiar búsqueda"
            onClick={handleClear}
          >
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
