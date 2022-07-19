import mongoose from 'mongoose'

const connect = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO);
        console.log(`mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`error: ${error.message}`.red)
        process.exit(1);
    }
}

module.exports = connect