import movieStore from "../../src/store/movie"
import _cloneDeep from 'loadsh/cloneDeep'
import axios from "axios"

discribe('store/movie.js', () => {
    let store

    beforeEach(() => {
        store = _cloneDeep(movieStore)
        store.state = store.state() // this.$store.state.movie.movies
        store.commit = (name, payload) => {
            store.mutations[name]()
        }
        store.dispatch = (name, payload) => {
            const context = {
                state: store.state,
                commit: store.commit,
                dispatch: store.dispatch
            }
            store.actions[name](context, payload)
        }
    })

    test('영화 데이터를 초기화합니다', () => {
        store.commit('updateState', {
            movies: [{ imdbID: '1 '}],
            message: 'Hello World',
            loading: true
        })
        store.commit('resetMovies')
        expect(store.state.movies).toEqual([])
        expect(store.state.message).toBe('Search for the movie title!')
        expect(store.state.loading).toBe(false)
    })

    test('영화 목록을 잘 가져온 경우 데이터를 확인합니다', async () => {
        const res = {
            data: {
                totalResults: '1',
                Search: [
                    {
                        imdbID: '1',
                        Title: 'Hello',
                        Poster: 'hello.jpg',
                        Year: '2021'
                    }
                ]
            }
        }
        axios.post = jest
            .fn()
            .mockResolvedValue(res)
        await store.dispatch('searchMovies')
        expect(store.state.movies).toEqual(res.data.Search)
    })

    test('영화 목록을 가져오지 못한 경우 에러 메세지를 확인합니다', async () => {
        const errMessage = 'Network Error'
        axios.post = jest.fn().mockRejectedValue(new Error(errMessage))
        await store.dispatch('searchMovies')
        expect(store.state.message).toBe(errMessage)
    })

    test('영화 아이템이 중복된 경우 고유하게 처리합니다.', async () => {
        const res = {
            data: {
                totalResults: '1',
                Search: [
                    {
                        imdbID: '1',
                        Title: 'Hello',
                        Poster: 'hello.jpg',
                        Year: '2021'
                    },
                    {
                        imdbID: '1',
                        Title: 'Hello',
                        Poster: 'hello.jpg',
                        Year: '2021'
                    },
                    {
                        imdbID: '1',
                        Title: 'Hello',
                        Poster: 'hello.jpg',
                        Year: '2021'
                    }
                ]
            }
        }
        axios.post = jest.fn().mockResolvedValue(res)
        await store.dispatch('searchMovies')
        expect(store.state.movies.length).toBe(1)
    })

    test('단일 영화의 상세 정보를 잘 가져온 경우 데이터를 확인합니다', () => {
        const res = {
            data: {
                imdbID: '1',
                Title: 'Frozen',
                Poster: 'frozen.jpg',
                Year: 2021
            }
        }
        axios.post = jest.fn().mockResolvedValue(res)
        await store.dispatch('searchMovieWithId')
        expect(store.state.theMovie).toEqual(res.data)
    })
})