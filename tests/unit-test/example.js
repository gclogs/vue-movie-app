import axios from "axios";
import _upperFirst from 'loadsh/upperFirst';
import _toLower from 'loadsh/toLower';

export async function fetchMovieTitle() {
    const res = await axios.get('https://omdbapi.com?apikey=7035c60c&i=tt4520988')
    return _upperFirst(_toLower(res.data.Title))
}