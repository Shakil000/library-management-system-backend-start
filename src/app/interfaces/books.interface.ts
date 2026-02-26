
export interface IBook {
  title: string,          // Required, trimmed string
  author: string,         // Required, trimmed string
  genre?: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY" | "Personal", 
  isbn: string,           // Required, unique string
  description?: string,   // Optional string
  copies: number,         // Required number
  available?: boolean,    // Defaults to true
  isBorrowed: boolean,   
}