import { ArrowRight } from "lucide-react"

interface InfoSectionProps {
  title: string
  description: string
  hasArrow?: boolean
}

const InfoSection = ({ title, description, hasArrow = false }: InfoSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <h3 className="text-sm font-medium uppercase">{title}</h3>
        {hasArrow && <ArrowRight size={16} className="ml-2" />}
      </div>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  )
}

export default InfoSection

