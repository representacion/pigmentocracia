import { Brand } from "@/components/ui-shell/footer/brand";
import { PAGES } from "@/config/navigation";

const Footer = () => {

    const navigationItems = PAGES.map((page) => {
        return (
            <a
                key={page.id}
                href={page.href}
            >
                {page.title}
            </a>
        );
    });

    return (
        <footer className="footer bg-neutral text-neutral-content p-10">
            <nav>
                <Brand />
                {navigationItems}
            </nav>
            <div>

            </div>
        </footer>
    );
};

export { Footer }