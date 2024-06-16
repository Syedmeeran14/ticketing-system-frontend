const ApiRoutes = {
    LOGIN: {
        path: '/user/login',
        authenticate: false
    },
    USER: {
        path: '/user',
        authenticate: true
    },
    CLOSED_PATH: {
        path: '/ticket',
        authenticate: true
    },
    CHAT: {
        path: '/chat',
        authenticate: true
    }
}

export default ApiRoutes