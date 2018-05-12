console.log(config)
console.log("Hello from S3 code!")

const headers = (obj) => {
  const result = {}

  Object.keys(obj).forEach((key) => {
    result[key] = [{
      key: key,
      value: obj[key]
    }]
  })

  return result
}

const response = {
  status: 200,
  statusDescription: "OK",
  headers: headers({
    "Content-Type": "text/html",
    "Cache-Control": "max-age=0",
    "Heyy": "yo",
    "Set-Cookie": "_sesh=rad; Domain=serverless.whimsy.space; HttpOnly"
  }),
  body: JSON.stringify(request)
};

callback(null, response);
