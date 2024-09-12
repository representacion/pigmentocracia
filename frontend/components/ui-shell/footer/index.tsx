import { Brand } from "@/components/ui-shell/footer/brand";
import { Contributors } from "@/components/ui-shell/footer/contributors";
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
            <div className="flex flex-col items-center">
                <Contributors />
            </div>
        </footer>
    );
};

export { Footer }