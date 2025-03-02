export interface Item {
  id: string;
}

export interface Team extends Item {
  name: string;
}

export interface Player extends Item {
  name: string;
  skill: number;
}

// Define the FormError type
export interface FormError {
  id: string;
  message: string;
}

// Define the hook's return type
export interface UseEditableListReturn {
  items: Item[];
  newItem: Item | null;
  editing: Record<string, string | undefined>;
  formError: FormError | null;
  handleAddItem: () => void;
  handleDeleteItem: (id: string) => Promise<void>;
  handleChange: (id: string, value: string) => void;
  handleBlur: (id: string) => Promise<void>;
  handleKeyDown: (id: string, e: React.KeyboardEvent<HTMLInputElement>) => void;
  setNewItem: React.Dispatch<React.SetStateAction<Item | null>>;
}
export interface EditableListProps {
  title: string;
  useHook: () => UseEditableListReturn;
  itemType: string;
}

export interface ResponseData {
  title: string;
  uniqueId: string;
  teams: Record<string, any[]>;
}
