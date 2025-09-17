import React, { type FC, useEffect, useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import { Layout, Menu, Switch, theme } from 'antd'
import { type ThemeAppearance, ThemeProvider } from 'antd-style'
import { type MenuItemType } from "antd/es/menu/interface"
import RefIcon from "@ant-design/icons/lib/icons/AccountBookFilled"
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { ProductOutlined, ShoppingCartOutlined, OrderedListOutlined, ProfileOutlined, LoginOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import "./pageLayout.css"
import logo from "/logo.svg"
import { useAuth } from "../../../app/providers"
import type { UserRole } from "../../../entities";
import { APP_ROUTE } from "../../../app";


type MenuVisibleType = "any" | "auth" | 'notauth'

interface RouteMenuItem {
    menu: MenuItemType,
    path: string,
    visType: MenuVisibleType,
    role: UserRole | null,
}

const CreateRouteMenuItem = (id: number, title: string, path: string, icon: typeof RefIcon,
    visibleType: MenuVisibleType = "any", role: UserRole | null = null): RouteMenuItem => {

    return {
        menu: {
            key: id,
            icon: React.createElement(icon),
            label: title,
            title,
            extra: React.createElement(NavLink, { to: path }),
        },
        path,
        visType: visibleType,
        role,
    }
}

const menuItems: RouteMenuItem[] = [
    CreateRouteMenuItem(1, 'Каталог', APP_ROUTE.product, ProductOutlined, "auth"),
    CreateRouteMenuItem(2, 'Корзина', APP_ROUTE.basket, ShoppingCartOutlined, "auth"),
    CreateRouteMenuItem(3, 'Заказы', APP_ROUTE.order, OrderedListOutlined, "auth"),
    CreateRouteMenuItem(4, 'Профиль', APP_ROUTE.profile, ProfileOutlined, "auth", "admin"),
    CreateRouteMenuItem(5, 'Вход', APP_ROUTE.login, LoginOutlined, "notauth"),
    CreateRouteMenuItem(6, 'Регистрация', APP_ROUTE.register, VerticalAlignTopOutlined, "notauth"),
    CreateRouteMenuItem(7, 'Выход', APP_ROUTE.logout, LoginOutlined, "auth"),
]

const handleDefaultSelectedKeys = (): string[] => {
    return menuItems.length > 0 ? [menuItems[0].menu.key.toString()] : []
}

const handleSelectedKeys = (path: string): string[] => {
    const selected = menuItems.filter(x => x.path === path).map(x => x.menu.key.toString())
    return selected
}

const PageLayout: FC = () => {
    const [appearance, setTheme] = useState<ThemeAppearance>('light');
    const { hasRole, isAuthenticated, roles } = useAuth()
    const location = useLocation()
    const [visibleMenuItems, setVisibleMenuItems] = useState<MenuItemType[]>([])

    useEffect(() => {
        const authenticated = isAuthenticated()
        const items = menuItems
            .filter(
                x => x.visType === "any" ||
                x.visType === "auth" && authenticated ||
                x.visType === "notauth" && !authenticated
                )
            .filter(x => x.role === null || hasRole(x.role))
            .map(x => x.menu)

        setVisibleMenuItems(items)
    }, [roles])

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
                    <Menu className="menu"
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={handleDefaultSelectedKeys()}
                        selectedKeys={handleSelectedKeys(location.pathname)}
                        items={visibleMenuItems}
                    />
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