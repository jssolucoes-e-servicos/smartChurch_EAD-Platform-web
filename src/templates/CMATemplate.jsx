import React from "react";
import { useRouter } from "next/router";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "~/partials/Navbar";
import AdminFooter from "~/partials/Footer";
import Sidebar from "~/partials/Sidebar";

import routes from "~/configs/routes/cma";

export default function CMATemplate(props) {
  const router = useRouter();

  let mainContentRef = React.createRef();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, []);

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
        {...props}
        routes={routes}
        logo={{
          link: "/matriculas/cma",
          imgSrc: "/assets/images/smartEAD-1.png",
          imgAlt: "smartEAD",
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar {...props} brandText={getBrandText()} userData={props.userData} />
        {props.children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </React.Fragment>
  );
}

