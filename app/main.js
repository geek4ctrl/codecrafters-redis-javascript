const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const map = {};

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
    connection.on("data", (data) => {

        let arrayOfData = data.toString().split("\r\n");
        console.log(arrayOfData);

        let word = arrayOfData[4];
        let anotherWord = arrayOfData[6];

        console.log(word);

        switch (arrayOfData[2].toLowerCase()) {

            case "ping":
                console.log('Data: ', data);
                connection.write("+PONG\r\n");
                break;

            case "echo":
                connection.write(`+${word}\r\n`);
                break;

            case "set":

                if (arrayOfData[8] == "PX") {

                    const current = new Date();

                    if (arrayOfData[10] > current.getTime()) {
                        connection.write(`+${map[word]}\r\n`);
                    } else {
                        connection.write("+\r\n");
                    }

                } else {
                    map[word] = anotherWord;
                    connection.write("+OK\r\n");
                }

                break;

            case "get":
                if (map[word]) {
                    connection.write(`+${map[word]}\r\n`);
                } else {
                    connection.write("-Error message\r\n");
                }
                break;

            default:
                return;

        }

    })
});

server.listen(6379, "127.0.0.1");
