import { NavBar } from "@/components/ui-shell/navbar";
import type { RootLayoutProps } from "@/types/app";
import "@/styles/globals.scss";

const RootLayout = ({ children }: RootLayoutProps) => {

    return (
        <html lang="es" data-theme="autumn">
            <body>
                <NavBar />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;