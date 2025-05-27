import { Users, Presentation, Network, PlaySquare } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  color: "blue" | "green" | "orange" | "red"
  icon: "users" | "presentation" | "network" | "presentation-play"
  contactText: string
}

const FeatureCard = ({ title, description, color, icon, contactText }: FeatureCardProps) => {
  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    orange: "bg-orange-500",
    red: "bg-red-500",
  }

  const renderIcon = () => {
    switch (icon) {
      case "users":
        return <Users size={24} />
      case "presentation":
        return <Presentation size={24} />
      case "network":
        return <Network size={24} />
      case "presentation-play":
        return <PlaySquare size={24} />
      default:
        return <Users size={24} />
    }
  }

  return (
    <div className="flex flex-col">
      <div
        className={`${colorClasses[color]} p-6 rounded-lg mb-6 h-[200px] flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300`}
      >
        <div className="text-white">{renderIcon()}</div>
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <p className="text-xs text-gray-500">{contactText}</p>
    </div>
  )
}

export default FeatureCard

