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

export interface ResponseData {
  title: string;
  uniqueId: string;
  teams: Record<string, any[]>;
}
