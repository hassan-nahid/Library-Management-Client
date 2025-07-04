export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  createdAt: string;
}

export type IQueryParams = {
  page?: number;
  limit?: number;
};

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface BorrowFormData {
  book: string;      
  quantity: number;  
  dueDate: string;  
}

export interface IErrorResponse {
  data?: {
    message?: string;
  };
}

export interface IBooksResponse {
  data: IBook[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}