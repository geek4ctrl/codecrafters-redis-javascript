const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
    connection.on("data", (data) => {

        let arrayOfData = data.toString().split("\r\n");
        console.log(arrayOfData);

        let word = arrayOfData[4];
        console.log(word);

        switch (arrayOfData[2].toLowerCase()) {

            case "ping":
                console.log('Data: ', data);
                connection.write("+PONG\r\n");
                break;

            case "echo":
                connection.write(`+${word}\r\n`);
                break;

            default:
                return;

        }

    })
});

server.listen(6379, "127.0.0.1");
