export interface IGenre {
  id: string;
  name: string;
}

/* Request */
export interface GenreRequest {
  name: string;
}

/* Response */
export interface GenresResponse {
  sucess: boolean;
  message: string;
  data: {
    genres: IGenre[];
  }
}

export interface GenreDeleteResponse {
  sucess: boolean;
  message: string;
  data: {
    genre: null | IGenre[];
  }
}

export interface GenreResponse {
  sucess: boolean;
  message: string;
  data: {
    genre: IGenre;
  }
}