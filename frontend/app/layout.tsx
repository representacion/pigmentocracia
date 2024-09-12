import { NavBar } from "@/components/ui-shell/navbar";
import { Footer } from "@/components/ui-shell/footer";
import type { RootLayoutProps } from "@/types/app";
import "@/styles/globals.scss";

const RootLayout = ({ children }: RootLayoutProps) => {

    return (
        <html lang="es" data-theme="autumn">
            <body className="w-full h-full flex flex-col">
                <NavBar />
                <main className="flex-grow px-2 md:px-6 py-9">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;