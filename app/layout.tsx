import { RootLayoutProps } from "@/types/app";
import "@/styles/globals.scss";

const RootLayout = ({ children }: RootLayoutProps) => {

    return (
        <html lang="es">
            <body>
                {children}
            </body>
        </html>
    );
};

export default RootLayout;