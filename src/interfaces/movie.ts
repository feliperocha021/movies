export interface IReview { 
  id: string;
  name: string;
  user: string; 
  comment: string; 
  rating: number;
  createdAt: string; 
  updatedAt: string;
}

export interface IMovie {
  id: string;
  name: string;
  image: string;
  year: number;
  details: string;
  cast: string[];
  reviews: IReview[];
  numReviews: number;
  genre: string;
}

/* Response */

export interface MoviesResponse {
  success: boolean;
  message: string;
  data: {
    movies: IMovie[];
  }
}

export interface MovieResponse {
  success: boolean;
  message: string;
  data: {
    movie: IMovie;
  }
}

export interface ReviewsResponse {
  success: boolean;
  message: string;
  data: {
    reviews: IReview[];
  }
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data: {
    review: IReview;
  }
}

export interface MovieDeleteResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data: {
    review: IReview;
  }
}

export interface ReviewDeleteResponse {
  success: boolean;
  message: string;
  data: {
    review: IReview[];
  }
}

export interface UploadedFile {
  filename: string;
  path: string;
  mimetype: string;
  size: number;
}

export interface UploadResponse {
  message: string;
  data: {
    file: UploadedFile;
  };
}

/* Request */

export type IReviewRequest = Omit<IReview, "id" | "name" | "user" | "createdAt" | "updatedAt">;

export interface MovieRequest {
  name: string;
  image?: string;
  year: number;
  details: string;
  cast: string[];
  reviews?: IReviewRequest[];
  numReviews?: number;
  genre: string;
}
