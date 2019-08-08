const dataStreamer = (request, cb) => {
    let allTheData = ""
    request.on('data', (chunk) => {
        allTheData += chunk
    })
    request.on('end', () => {
        cb(allTheData)
    })
}

module.exports = { dataStreamer }

