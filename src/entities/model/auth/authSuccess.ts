import type { Profile } from "./profile"

export interface AuthSuccess {
    token: string
    profile: Profile
}