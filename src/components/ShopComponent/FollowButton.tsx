import { Button } from "@/components/ui/button"
import { UserPlus, UserMinus } from 'lucide-react'

interface FollowButtonProps {
  isFollowing: boolean
  onClick: () => void
}

export function FollowButton({ isFollowing, onClick }: FollowButtonProps) {
  return (
    <Button 
      onClick={onClick}
      variant={isFollowing ? "outline" : "default"}
    >
      {isFollowing ? (
        <>
          <UserMinus className="mr-2 h-4 w-4" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="mr-2 h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  )
}

