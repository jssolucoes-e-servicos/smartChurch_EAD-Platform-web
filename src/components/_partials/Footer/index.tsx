import { Col, Nav, NavItem, NavLink, Row } from "reactstrap";

function Footer() {

  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="https://www.jssolucoeseservicos.com.br/familia-smart/smart-ead"
              rel="noopener noreferrer"
              target="_blank"
            >
              smartEAD
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">

            <NavItem>
              <NavLink
                href="https://www.jssolucoeseservicos.com.br"
                rel="noopener noreferrer"
                target="_blank"
              >
                JS Soluções e Serviços
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://webmail.ieqtuamorada.com.br"
                rel="noopener noreferrer"
                target="_blank"
              >
                Webmail
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://central.ietuamorada.com.br"
                rel="noopener noreferrer"
                target="_blank"
              >
                Central de Células
              </NavLink>
            </NavItem>


          </Nav>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
