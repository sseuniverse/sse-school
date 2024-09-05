import { Helmet } from "react-helmet-async"
import { Chat } from "../sections/dashboard/chat"

export default function ChatPage() {
    return (
        <>
            <Helmet>
                <title>Chat | SSE SMS</title>
            </Helmet>
            <Chat />
        </>
    )
}