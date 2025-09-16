import React, { type FC, useEffect, useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import { Layout, Menu, Switch, theme } from 'antd'
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { ProductOutlined, ShoppingCartOutlined, OrderedListOutlined, ProfileOutlined, LoginOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
// import { MenuItemType } from "antd/es/menu/interface"
// import LanguageToggle from "src/shared/lang-toggle/lang-toggle"
// import ThemeToggle from "src/shared/theme-toggle/theme-toggle"
import "./pageLayout.css"
import logo from "/logo.svg"
import RefIcon from "@ant-design/icons/lib/icons/AccountBookFilled"
// import { useAuth, UserRole } from "src/context/auth-provider/AuthProvider"
import { type ThemeAppearance, ThemeProvider } from 'antd-style'


type MenuVisibleType = "any" | "auth" | 'notauth'

interface RouteMenuItem {
    // menu: MenuItemType,
    path: string,
    visType: MenuVisibleType,
    // role: UserRole | null,
}

// const CreateRouteMenuItem = (id: number, title: string, path: string, icon: typeof RefIcon,
//     visibleType: MenuVisibleType = "any", role: UserRole | null = null): RouteMenuItem => {

//     return {
//         menu: {
//             key: id,
//             icon: React.createElement(icon),
//             label: title,
//             title,
//             extra: React.createElement(NavLink, { to: path }),
//         },
//         path,
//         visType: visibleType,
//         role,
//     }
// }

// const menuItems: RouteMenuItem[] = [
//     CreateRouteMenuItem(1, 'Каталог', "/prod", ProductOutlined, "auth"),
//     CreateRouteMenuItem(2, 'Корзина', "/basket", ShoppingCartOutlined, "auth"),
//     CreateRouteMenuItem(3, 'Заказы', "/order", OrderedListOutlined, "auth"),
//     CreateRouteMenuItem(4, 'Профиль', "/profile", ProfileOutlined, "auth", "admin"),
//     CreateRouteMenuItem(5, 'Вход', "/auth", LoginOutlined, "notauth"),
//     CreateRouteMenuItem(6, 'Регистрация', "/register", VerticalAlignTopOutlined, "notauth"),
//     CreateRouteMenuItem(7, 'Выход', "/logout", LoginOutlined, "auth"),
// ]

// const handleDefaultSelectedKeys = (): string[] => {
//     return menuItems.length > 0 ? [menuItems[0].menu.key.toString()] : []
// }

// const handleSelectedKeys = (path: string): string[] => {
//     const selected = menuItems.filter(x => x.path === path).map(x => x.menu.key.toString())
//     return selected
// }

const PageLayout: FC = () => {
    const [appearance, setTheme] = useState<ThemeAppearance>('light');
    // const { hasRole, isAuthenticated, roles } = useAuth()
    const location = useLocation()
    // const [visibleMenuItems, setVisibleMenuItems] = useState<MenuItemType[]>([])

    // useEffect(() => {
    //     const authenticated = isAuthenticated()
    //     const items = menuItems
    //         .filter(
    //             x => x.visType === "any" ||
    //             x.visType === "auth" && authenticated ||
    //             x.visType === "notauth" && !authenticated
    //             )
    //         .filter(x => x.role === null || hasRole(x.role))
    //         .map(x => x.menu)

    //     setVisibleMenuItems(items)
    // }, [roles])

    const handleChangeTheme = (checked: boolean) => {
        (checked) ? setTheme('light') : setTheme('dark')
    }

    return (
        <ThemeProvider appearance={appearance}>
            <Layout>
                <Layout.Header className="layout-header">
                    <div className="header-link">
                        <img src={logo} className="app-logo" alt="logo" />
                    </div>
                    {/* <Menu className="menu"
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={handleDefaultSelectedKeys()}
                        selectedKeys={handleSelectedKeys(location.pathname)}
                        items={visibleMenuItems}
                    /> */}
                    <div className="header-tools">
                        <Switch
                            checkedChildren={<SunOutlined />}
                            unCheckedChildren={<MoonOutlined />}
                            defaultChecked
                            onChange={handleChangeTheme}
                        />
                    </div>
                </Layout.Header>
                <Layout.Content className="layout-content">
                    <div style={{backgroundColor: theme.defaultSeed.colorBgBase}}>
                        <Outlet />
                    </div>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    OTUS React Project
                </Layout.Footer>
            </Layout>
        </ThemeProvider>
    )
}

export default PageLayout

// style={{background: theme.defaultSeed.colorBgBase }}