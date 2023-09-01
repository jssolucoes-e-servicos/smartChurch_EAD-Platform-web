import { useRouter } from "next/router";
import React from "react";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminFooter from "@/components/_partials/Footer";
import AdminNavbar from "@/components/_partials/Navbar";
import Sidebar from "@/components/_partials/Sidebar";

import { PageLayoutProps } from "@/@types/app";
import routes from "@/configs/routes/aluno";

export default function AlunoTemplate({children,userData}: PageLayoutProps) {
  const router = useRouter();

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "smartEAD";
  };

  return (
    <React.Fragment>
      <Sidebar
        /* {...props} */
        routes={routes}
        logo={{
          link: "/ava",
          imgSrc: "/assets/images/smartEAD-1.png",
          imgAlt: "smartEAD",
        }}
      />
      <div className="main-content">
        <AdminNavbar /* {...props} */ brandText={getBrandText()} userData={userData} />
        {children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </React.Fragment>
  );
}

