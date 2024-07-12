import { RootLayoutProps } from "@/types/app";

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