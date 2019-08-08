const dataStreamer = (request, cb) => {
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

