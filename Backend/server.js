const http = require('./app');

const port = process.env.PORT || 3030

http.listen(3030, () => {
  console.log(`listening on port: ${port}`);
});
  