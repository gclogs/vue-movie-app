<template>
    <HeadLine></HeadLine>
    <Search></Search>
    <MovieList />
</template>

<script>
import HeadLine from "../components/Headline.vue";
import Search from "../components/Search.vue";
import MovieList from '../components/MovieList.vue';

export default {
    components: {
        HeadLine,
        Search,
        MovieList
    },
    created() {
        this.$store.commit('movie/resetMovies');
    }
}
</script>