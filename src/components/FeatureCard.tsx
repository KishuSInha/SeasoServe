import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  route: string;
  icon?: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, route, icon, className = "" }: FeatureCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <Card 
      onClick={handleClick}
      className={`cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] ${className}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {icon && <div className="text-2xl">{icon}</div>}
          <div>
            <CardTitle className="text-sm">{title}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default FeatureCard;