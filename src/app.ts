import WebSocket from "ws";

const ws = new WebSocket.Server({ port: 8080 }, () => console.log("socket 開始"));
const clients: WebSocket.WebSocket[] = [];

ws.on("connection", (client) => {
    clients.push(client);
    client.send("歡迎光臨");
    client.on("message", (message) => {
        console.log(`來自前端的資料 ${message}`);
        clients.forEach((item) => {
            item.send(message);
        });
    });
    client.on("close", () => console.log(` 前端主動斷開連接`));
});
