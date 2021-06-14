const dev={
    API_URL:"http://localhost:4000/api",
    SOCKET_URL: "http://localhost:4000",
    DOMAIN: "Chat App",
}

const prod={
    API_URL:"http://localhost:4000/api",
    SOCKET_URL: "http://localhost:4000",
    DOMAIN: "Chat App",
}
const config=process.env.NODE_ENV==='development'?dev:prod
export default  config
