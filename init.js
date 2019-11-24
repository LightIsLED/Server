var app = require("./app");

const PORT = process.env.PORT || 5000;

const handleListening = () => 
    console.log(`Listening on: ${PORT}`);

app.listen(PORT,handleListening);