import Link from "next/link";
import { Button } from "@commercex/ui";
import { Hammer } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8">
        <Hammer size={32} />
      </div>
      <h2 className="text-4xl font-extrabold tracking-tight mb-4">Under Construction</h2>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-md">
        We are currently building this section of the marketing platform. Check back soon for updates.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
