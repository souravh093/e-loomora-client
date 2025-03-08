import { ReactNode } from "react"

const Container = ({children, className}: {children: ReactNode, className?: string}) => {
  return (
    <div className={`container mx-auto px-2 lg:px-0 ${className}`}>
        {children}
    </div>
  )
}

export default Container