import { createPinia, setActivePinia } from "pinia";
import { useMovieStore } from "@/stores/movies";
import { beforeEach, test, describe, expect, it } from 'vitest'

describe("User Store", () => {


    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test("the expected state", () => {
        const movieStore = useMovieStore();
        expect(movieStore.movies).toEqual([]);
    });

    test("expect to get allmovies paginated", () => {
        const movieStore = useMovieStore();
        const foo = [{ id: 1, title: "The Lord of the Rings: The Return of the King", year: 2003, director: "Peter Jackson", genres: "Fantasy" }, { id: 2, title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980, director: "Irvin Kershner", genres: "science fiction" }, { id: 3, title: "The Pianist", year: 2002, director: "Roman Polanski", genres: "Autobiography" }, { id: 4, title: "Gladiator", year: 2000, director: "Ridley Scott", genres: "Action movie" }, { id: 5, title: "The Green Mile", year: 1999, director: "Frank Darabont", genres: "Drama" }, { id: 6, title: "The Intouchables", year: 2011, director: "Olivier Nakache and Eric Toledano", genres: "French comedy-drama film" }, { id: 7, title: "The Lion King", year: 1994, director: "Roger Allers and Rob Minkoff", genres: "Animated musical" }, { id: 8, title: "City of God", year: 2002, director: "Fernando Meirelles and Kátia Lund", genres: "crime drama" }, { id: 9, title: "Braveheart", year: 1995, director: "Mel Gibson", genres: "Historical drama" }, { id: 10, title: "Psycho", year: 1960, director: "Alfred Hitchcock", genres: "Psychological horror" }, { id: 11, title: "Apocalypse Now", year: 1979, director: "Francis Ford Coppola", genres: "Historical" }, { id: 12, title: "Aliens", year: 1986, director: "James Cameron", genres: "Horror." }, { id: 13, title: "Sunset Boulevard", year: 1950, director: "Billy Wilder", genres: "Action movie" }, { id: 14, title: "The Terminator", year: 1984, director: "James Cameron", genres: "Action movie" }, { id: 15, title: "The Elephant Man", year: 1980, director: "David Lynch", genres: "Horror." }, { id: 16, title: "Taxi Driver", year: 1976, director: "Martin Scorsese", genres: "psychological drama" }, { id: 17, title: "Lawrence of Arabia", year: 1962, director: "David Lean", genres: "Adventure" }, { id: 18, title: "Casablanca", year: 1942, director: "Michael Curtiz", genres: "romantic drama" }, { id: 19, title: "Vertigo", year: 1958, director: "Alfred Hitchcock", genres: "Psychological thriller" }, { id: 20, title: "The Bridge on the River Kwai", year: 1957, director: "David Lean", genres: "Historical" }, { id: 21, title: "The Bridge on the River Kwai", year: 1957, director: "David Lean", genres: "Historical" }]
        movieStore.movies = foo;
        const response = movieStore.getAllMoviesByPage;
        expect(response.length).toBe(2);
    });

    test("expect to assign favorite", () => {
        const movieStore = useMovieStore();
        const foo = [{ id: 1, title: "The Lord of the Rings: The Return of the King", year: 2003, director: "Peter Jackson", genres: "Fantasy", favorite: false }, { id: 2, title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980, director: "Irvin Kershner", genres: "science fiction", favorite: false}]
        movieStore.movies = foo;
        const data = { id: 1, title: "The Lord of the Rings: The Return of the King", year: 2003, director: "Peter Jackson", genres: "Fantasy", favorite:true}
        movieStore.assignFavorite(data);
        expect(movieStore.movies[0]).toEqual(data);
    });
});