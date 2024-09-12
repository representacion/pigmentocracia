import { CgMenu } from "react-icons/cg";
import type { Page } from "@/types/config/pages";

interface MobileProps {
    /**
     * The pages to display in the mobile dropdown menu.
     */
    pages: Page[];
};

/**
 * Mobile Dropdown Menu
 * 
 * This component displays the mobile dropdown menu.
 * 
 * @param {MobileProps} props - The page props. 
 */
const Mobile = ({ pages }: MobileProps) => {

    const menuItems = pages.map((page) => {
        return (
            <li key={page.id}>
                <a
                    href={page.href}
                    className="p-2 text-base"
                >
                    {page.title}
                </a>
            </li>
        );
    });

    return (
        <div className="dropdown">
            <button className="btn btn-ghost lg:hidden" tabIndex={0}>
                <CgMenu size={24} />
            </button>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
                {menuItems}
            </ul>
        </div>
    );
};

export { Mobile };