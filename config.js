module.exports = {
    dev:{
        connectionString: 'postgres://postgres:docker@localhost:5432/memo_db',
        port: '8000'
    },
    production:{
        connectionString: process.env.POST_CONNECTION_STRING + "?ssl=true",
        port: process.env.PORT
    }

}