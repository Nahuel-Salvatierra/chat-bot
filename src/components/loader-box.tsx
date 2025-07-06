import { Loader2Icon } from "lucide-react";

export default function LoaderBox() {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2Icon className="w-4 h-4 animate-spin" />
    </div>
  );
}
