import Link from "next/link";
import { useContext } from "react";
// reactstrap components
import { AuthContext, signOut } from "@/contexts/AuthContext";
import md5 from "md5";
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  Navbar,
  UncontrolledDropdown,
} from "reactstrap";

function AdminNavbar({ brandText, userData }: any) {
  const context = useContext(AuthContext);

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link href="/" className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
            {brandText}
          </Link>

          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={`https://www.gravatar.com/avatar/${md5(
                        userData?.email ? userData.email : 'teste@gmail.com'
                      )}`
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {userData?.name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Bem vindo!</h6>
                </DropdownItem>
                <Link href="/portal/aluno/minha-conta">
                  <DropdownItem>
                    <i className="ni ni-single-02" />
                    <span>Minha conta</span>
                  </DropdownItem>
                </Link>
                {/*    <Link href="/portal/aluno/configuracoes">
                  <DropdownItem>
                    <i className="ni ni-settings-gear-65" />
                    <span>Configurações</span>
                  </DropdownItem>
                </Link> */}
                {/* <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                </Link> */}
                {/* <Link href="/portal/aluno/suporte">
                  <DropdownItem>
                    <i className="ni ni-support-16" />
                    <span>Suporte</span>
                  </DropdownItem>
                </Link> */}
                <DropdownItem divider />
                <DropdownItem onClick={signOut}>
                  <i className="ni ni-user-run" />
                  <span>Sair</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
