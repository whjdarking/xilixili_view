import axios from 'axios'

axios.defaults.withCredentials = true;

const postVideo = form => axios.post('/api/v1/videos', form).then(res => res.data)

const getVideo = id => axios.get(`/api/v1/video/${id}`).then(res => res.data)

const getVideos = (start, limit) => axios.get('/api/v1/videos', {params: {start, limit}}).then(res => res.data)

const getWeeklyRank = () => axios.get('/api/v1/rank/weekly').then(res => res.data)

const postUploadToken = fileName => axios.post('/api/v1/upload/token', {filename: fileName}).then(res => res.data);

const register = form => axios.post('/api/v1/user/register', form).then(res => res.data)

const login = form => axios.post('/api/v1/user/login', form).then(res => res.data)

const getCurrentUser = () => axios.get('/api/v1/user/me').then(res => res.data)

export {
    postVideo,
    getVideo,
    getVideos,
    getWeeklyRank,
    postUploadToken,
    register,
    login,
    getCurrentUser
}
