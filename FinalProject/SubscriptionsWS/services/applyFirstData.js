const axios = require("axios");
const membersService = require("./membersService");
const moviesService = require("./moviesService");

const getMembersAndMovies = async () => {
  try {
    const { data: members } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const { data: movies } = await axios.get("https://api.tvmaze.com/shows");

    const filteredMembers = members.map((member) => {
      return {
        Name: member.name,
        Email: member.email,
        City: member.address.city,
      };
    });

    const filteredMovies = movies.map((movie) => {
      return {
        Name: movie.name,
        Genres: movie.genres,
        Image: movie.image.medium,
        Premiered: movie.premiered,
      };
    });

    await membersService.addManyMembersAtOnce(filteredMembers);
    await moviesService.addManyMoviesAtOnce(filteredMovies);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getMembersAndMovies;
