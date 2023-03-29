import { ExpressAdapter } from  "@bull-board/express"
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { createBullBoard } from "@bull-board/api"
import { sendMailQueue } from "./bullConfig";

// Create Server Adapter
const serverAdapter = new ExpressAdapter()

const bullBoard = createBullBoard({
    queues: [
        new BullMQAdapter(sendMailQueue),
    ],
    serverAdapter: serverAdapter,
    options: {
        uiConfig: {
            boardTitle: 'My BOARD',
        }
    }
})

serverAdapter.setBasePath("/admin")


export default serverAdapter;