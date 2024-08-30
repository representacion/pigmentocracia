import type { Page } from "@/types/config/pages";

interface NavigationProps {
    /**
     * The pages to display in the navigation.
     */
    pages: Page[];
};

const Navigation = ({ pages }: NavigationProps) => {

    const menuItems = pages.map((page) => {
        return (
            <li key={page.id}>
                <a
                    href={page.href}
                >
                    {page.title}
                </a>
            </li>
        );
    });

    return (
        <ul className="menu menu-horizontal px-1">
            {menuItems}
        </ul>
    );
};

export { Navigation };