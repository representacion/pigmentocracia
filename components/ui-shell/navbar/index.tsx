import { Brand } from "@/components/ui-shell/navbar/brand";
import { Mobile } from "@/components/ui-shell/navbar/mobile";
import { Navigation } from "@/components/ui-shell/navbar/navigation";
import { PAGES } from "@/config/navigation";

/**
 * Navigation Bar
 * 
 * This component renders a top navigation bar (brand, and menu). 
 * 
 * This component is responsive and will render a mobile menu when the screen size is smaller
 * than the `lg` breakpoint.
 * 
 * @returns 
 */
const NavBar = () => {

    return (
        <nav className="navbar bg-base-100">
            <div className="navbar-start">
                <Mobile pages={PAGES} />
                <Brand />
            </div>
            <div className="navbar-center hidden lg:flex">
                <Navigation pages={PAGES} />
            </div>
        </nav>
    );
};

export { NavBar };