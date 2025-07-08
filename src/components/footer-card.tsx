import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function FooterCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-0 shadow-sm shadow-indigo-800 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-slate-800 flex w-full items-center gap-2 dark:text-slate-200">
          <div className="w-fit p-3 h-fit bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center ">
            {icon}
          </div>
          <p className="w-full text-center">{title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
