const dataStreamer = (request, response, cb) => {
    let allTheData = ""
    request.on('data', (chunk) => {
        allTheData += chunk
    })
    request.on('end', () => {
        console.log(allTheData)
        cb(allTheData)
    })
}

module.exports = { dataStreamer }

