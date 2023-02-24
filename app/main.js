const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
    connection.on("data", (data) => {

        let arrayOfData = data.split("\r\n");

        for (let i = 0; i < arrayOfData.length; i++) {
            if (arrayOfData[i].toLowerCase().includes("echo") || arrayOfData[i].toLowerCase().includes("$") || arrayOfData[i].toLowerCase().includes("*")) {
                return;
            } else {
                connection.write(arrayOfData[i] + "\r\n");
            }
        }

        console.log('Data: ', data);
        connection.write("+PONG\r\n");

    })
});

server.listen(6379, "127.0.0.1");
