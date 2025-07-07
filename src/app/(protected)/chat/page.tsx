import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MessageView from "../../../components/message-view";
import MessageForm from "../../../components/message-form";

export default async function ChatPage() {
  return (
    <div className="w-full h-screen flex p-4 ">
      <Card className="w-full h-full flex flex-col  justify-between">
        <CardHeader>
          <CardTitle>Chat with IA Assistant</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto  self-center w-full max-w-2xl">
          <MessageView />
          <MessageForm />
        </CardContent>
      </Card>
    </div>
  );
}
