import {
    createApp,
    ref,
    onMounted,
} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.0-beta.7/vue.esm-browser.min.js";

createApp({
    setup() {
        const ws = new WebSocket("ws://localhost:8080/");
        const message = ref("");
        const username = ref("");
        const chatroom = ref([]);
        const tempUsername = ref("");

        const addUsername = () => {
            username.value = tempUsername.value;
        };
        const addMessage = () => {
            ws.send(JSON.stringify({ message: message.value, username: username.value, time: Date.now() }));
        };

        onMounted(() => {
            ws.onopen = () => console.log(`WebSocket 服務已連接`);
            ws.onclose = () => console.log(`WebSocket 伺服器關閉`);

            ws.onmessage = (message) => {
                if (typeof message.data !== "object") return;
                const reader = new FileReader();
                reader.readAsText(message.data, "utf-8");
                reader.onload = () => {
                    const date = JSON.parse(reader.result);
                    chatroom.value.push(date);
                    console.log(`來自服務器端的資料 : ${date}`);
                };
            };
        });

        return { message, username, tempUsername, chatroom, addMessage, addUsername };
    },
}).mount("#app");
