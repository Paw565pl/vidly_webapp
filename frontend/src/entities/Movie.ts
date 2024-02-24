import Genre from "./Genre";

interface Movie {
  _id: string;
  title: string;
  genre: Genre;
  numberInStock: number;
  dailyRentalRate: number;
  publishedDate: string;
}

export default Movie;
