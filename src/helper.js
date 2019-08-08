const dataStreamer = (request, response) => {
    let allTheData = ""
    request.on('data', (chunk) => {
        allTheData += chunk
    })
    request.on('end', () => {
        console.log(allTheData)
        return allTheData
        response.end();
    })
}

module.exports = { dataStreamer }

