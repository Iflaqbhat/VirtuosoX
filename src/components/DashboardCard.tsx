
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function DashboardCard({ 
  title, 
  description, 
  icon, 
  className, 
  footer, 
  children 
}: DashboardCardProps) {
  return (
    <Card className={cn("h-full overflow-hidden transition-all hover:shadow-md bg-card-gradient", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="border-t bg-muted/10 px-6 py-3">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
