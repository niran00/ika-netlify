"use client"

import { useAuth } from "@/app/context/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, Shield } from 'lucide-react'
import { useRouter } from "next/navigation"
import { logoutUser } from "@/app/[lang]/actions/auth"

export function UserMenu() {
  const { user, isLoggedIn, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (!isLoggedIn) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/en/login")}
        className="text-gray-600 hover:text-[#00599c] p-2 flex items-center gap-1"
      >
        <User className="h-5 w-5" />
        <span className="hidden md:inline text-sm">Login</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#00599c] p-2 flex items-center gap-1">
          <User className="h-5 w-5" />
          <span className="hidden md:inline text-sm">
            {user?.firstName} {user?.lastName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <Shield className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard?tab=profile")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
