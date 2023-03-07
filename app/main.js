const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const map = {};
const storage = new Map();

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
    connection.on("data", (data) => {

        let arrayOfData = data.toString().split("\r\n");
        console.log(arrayOfData);

        let key = arrayOfData[4];
        let value = arrayOfData[6];
        const ttl = parseInt(arrayOfData[10]);
        const timestamp = ttl !== undefined ? (new Date().getTime() + ttl) : null;

        switch (arrayOfData[2].toLowerCase()) {

            case "ping":
                console.log('Data: ', data);
                connection.write("+PONG\r\n");
                break;

            case "echo":
                connection.write(`+${key}\r\n`);
                break;

            case "set":

                // map[key] = { value: value, timestamp: timestamp };
                storage.set(key, { value: value, timestamp: timestamp });

                connection.write("+OK\r\n");
                break;

            case "get":

                // const answer = map[key];
                const answer = storage.get(key);

                const currentTime = new Date().getTime();
                const expiredTime = answer.timestamp;

                if (answer.timestamp) {
                    if (currentTime < expiredTime) {
                        connection.write(`+${answer.value}\r\n`);
                    } else {
                        connection.write(`$-1\r\n`);
                    }
                }

                break;

            default:
                return;

        }

    })
});

server.listen(6379, "127.0.0.1");
