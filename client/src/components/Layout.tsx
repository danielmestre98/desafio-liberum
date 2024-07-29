import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

interface LayoutProps {
    children: ReactNode; // Type for children prop
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <header className="mb-5">
                <Navbar className="bg-body-secondary">
                    <Container>
                        <Navbar.Brand className="lead" href="/">
                            Portal Administrador
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="d-flex gap-3 justify-content-end">
                            <Navbar.Text className="user-text">Administrador</Navbar.Text>
                            <img width={40} style={{ borderRadius: "100%" }} src="/default-user-image.png" alt="" />
                            <FontAwesomeIcon className="user-text" icon={faChevronDown} />
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
