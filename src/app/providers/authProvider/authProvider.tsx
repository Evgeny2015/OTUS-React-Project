import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AuthData, AuthSuccess, AuthErrorResponse, Profile, UserRole } from "../../../entities"
import { profileActions } from "../../store"
import { tokenSelectors, tokenThunks } from "../../store/token"
import { COMMAND_ID } from "../../config"
import { AuthApi } from "../../api"


interface AuthContextType {
    currentUser: string | null
    errors: string[]
    roles: UserRole[]
    clear: () => void,
    hasRole: (role: UserRole) => boolean
    isAdmin: () => boolean
    isAuthenticated: () => boolean
    login: (auth: AuthData) => void
    logout: () => void
    register: (auth: AuthData, onSuccess: () => void) => void
    saveProfile: (profile: Profile) => void
    setRoles: (roles: UserRole[]) => void
}

export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    errors: [],
    roles: [],
    clear: () => {},
    hasRole: () => false,
    isAdmin: () => false,
    isAuthenticated: () => false,
    login: () => { },
    logout: () => { },
    register: () => { },
    saveProfile: () => {},
    setRoles: () => { },
});

export const useAuth = () => {
    return useContext(AuthContext);
};

type AuthProviderProps = {
    children: ReactNode;
};


/*
 * Провайдер авторизации
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const authenticated = useSelector(tokenSelectors.authenticated)
    const [currentUser, setCurrentUser] = useState<AuthData['email'] | null>(null);
    const [roles, setRoles] = useState<UserRole[]>([])
    const [errors, setErrors] = useState<string[]>([])
    const dispatch = useDispatch<any>()

    const handleAuthError = (response: AuthErrorResponse) => {
        setErrors(response.data.errors.map(x => x.message))
    }

    const handleSignIn = (response: AuthSuccess) => {
        setErrors([])
        // получаем и проверяем токен
        if (response.profile.commandId !== COMMAND_ID)
        {
            setErrors(['wrong command!'])
            return
        }

        // если токен верный, сохраняем токен, генерируем профиль,
        // сохраняем email как имя пользователя, добавляем группу
        dispatch(tokenThunks.setToken(response.token))
        handleProfile(response.profile)
    }

    // const handleGetProfile = (response: Profile) => {
    //     setErrors([])
    //     handleProfile(response)
    // }

    const [ rtkSignIn ] = AuthApi.useRtkSignInMutation()
    const [ rtkSignUp ] = AuthApi.useRtkSignUpMutation()
    const [ rtkGetProfile ] = AuthApi.useRtkGetProfileMutation()
    const [ rtkSetProfile ] = AuthApi.useRtkSetProfileMutation()

    const handleClear = () => {
        setErrors([])
    }

    const handleHasRole = (role: UserRole) => roles.indexOf(role) >= 0

    const handleIsAdmin = () => handleHasRole("admin")

    const handleIsAuthenticated = () => authenticated

    const handleLogin = (auth: AuthData) => {
        // отправляем учетные данные
        rtkSignIn(auth)
            .then((x) => {
                if (!!x.data) {
                    handleSignIn(x.data)
                }
                else {
                    handleAuthError(x.error as AuthErrorResponse)
                }
            })
            .catch((x) => {
                console.error(x)
            })
    }

    const handleLogout = () => {
        // удаляем токен
        dispatch(tokenThunks.clear())
        setCurrentUser(null)
        setRoles([])
    }

    const handleRegister = (auth: AuthData, onSuccess: () => void) => {
        setErrors([])

        // Redux-toolkit-query
        rtkSignUp(auth)
            .then((x) => {
                if (!!x.data) {
                    onSuccess()
                }
                else
                    handleAuthError(x.error as AuthErrorResponse)
            })
            .catch((x) => console.error(x))
    }

    const handleSaveProfile = (profile: Profile) => {
        rtkSetProfile(profile)
            .then(x => {
                if (!!x.data)
                    handleProfile(x.data)
                else
                    handleAuthError(x.error as AuthErrorResponse)
            })
            .catch(x => x)
    }

    const handleProfile = (profile: Profile) => {
        setCurrentUser(profile.email)
        dispatch(profileActions.set(profile))
        setRoles(['admin'])
    }

    const handleSetRoles = async (roles: UserRole[]) => {
        setRoles(() => roles);
    }

    useEffect(() => {
        try {
            if (authenticated) {
                rtkGetProfile().then((x) => {
                    if (x.data)
                        handleProfile(x.data)
                })
            } else {
                handleLogout()
            }
        } catch (error) {
            handleLogout()
        } finally {

        }
    }, []);

    const value = {
        currentUser,
        errors,
        roles,
        clear: handleClear,
        hasRole: handleHasRole,
        isAdmin: handleIsAdmin,
        isAuthenticated: handleIsAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        saveProfile: handleSaveProfile,
        setRoles: handleSetRoles,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider