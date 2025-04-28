import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Container,
  Button,
} from "reactstrap";
import Image from "next/image";
import logo from "../../public/assets/images/logo.png";
import Link from "next/link";
import CustomModal from "../Common/CustomModal";
import AppraisalForm from "../Common/AppraisalForm";
import Accordion from "react-bootstrap/Accordion";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = "auto";
    return () => {
      document.body.style.overflowY = "hidden";
    };
  }, []);
  const toggle = () => setIsOpen(!isOpen);
  const [modal, setModal] = useState(false);
  const modalToggle = () => setModal(!modal);

  const [dropDown, setDropDown] = useState({
    buy: false,
    rent: false,
    sold: false,
    about: false,
    contact: false,
  });
  const dropDownToggle = e => {
    setDropDown({
      ...dropDown,
      [e.target.name]: !dropDown[e.target.name],
    });
  };
  return (
    <>
      <CustomModal
        className="appraisal-modal"
        fade
        isOpen={modal}
        toggle={modalToggle}
        size="lg"
        heading="Request an Appraisal"
        subHeading="OKAS PROPERTY GROUP"
      >
        <div className="appraisal-content">
          <AppraisalForm />
        </div>
      </CustomModal>

      <header className={`${isOpen && "active-menu"}`}>
        <Navbar light expand="lg" fixed="top">
          <Container>
            <Link href="/" passHref>
              <NavbarBrand>
                <Image
                  width="130"
                  height="43"
                  src={logo}
                  alt="logo"
                  unoptimized
                  priority
                  loading="eager"
                />
              </NavbarBrand>
            </Link>
            <NavbarToggler onClick={toggle} className={`${isOpen && "open"}`} />
            <div className="header-overlay" onClick={toggle}></div>
            <Collapse isOpen={isOpen} navbar>
              <NavbarToggler
                onClick={toggle}
                className={`${isOpen && "open"} minmenu-close`}
              />
              <Nav navbar className="mx-auto manu-nav">
                <NavItem>
                  <Link href="/" passHref>
                    <NavLink className={router.pathname == "/" && "active"}>
                      Home
                    </NavLink>
                  </Link>
                </NavItem>
                {/* <NavItem>
                <NavLink className={router.pathname == "/buy" && "active"} href="/buy">Buy</NavLink>
              </NavItem> */}
                <Dropdown
                  nav
                  isOpen={dropDown.buy}
                  toggle={dropDownToggle}
                >
                  <DropdownToggle
                    nav
                    name="buy"
                    caret
                    className={
                      (router.pathname == "/buy" && "active") ||
                      (router.pathname == "/inspections" && "active")
                    }
                  >
                    Buy
                  </DropdownToggle>
                  <DropdownMenu>
                    <Link href="/buy" passHref>
                      <NavLink
                        className={router.pathname == "/buy" && "active"}
                      >
                        Properties For Sale
                      </NavLink>
                    </Link>
                    <Link href="/inspections" passHref>
                      <NavLink
                        className={
                          router.pathname == "/inspections" && "active"
                        }
                      >
                        Open Homes
                      </NavLink>
                    </Link>
                    <Link
                      href="https://www.consumer.vic.gov.au/duediligencechecklist"
                      passHref
                    >
                      <NavLink target="_blank">Due Diligence Checklist</NavLink>
                    </Link>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  nav
                  isOpen={dropDown.rent}
                  toggle={dropDownToggle}
                >
                  <DropdownToggle
                    nav
                    name="rent"
                    caret
                    className={
                      (router.pathname == "/rent" && "active") ||
                      (router.pathname == "/rentApplication" && "active") ||
                      (router.pathname == "/lease-inspections" && "active") ||
                      (router.pathname == "/maintenance-request-form" &&
                        "active") ||
                      (router.pathname == "/rental-application-form" &&
                        "active")
                    }
                  >
                    Rent
                  </DropdownToggle>
                  <DropdownMenu>
                    <Link href="/rent" passHref>
                      <NavLink
                        className={router.pathname == "/rent" && "active"}
                      >
                        Properties For Lease
                      </NavLink>
                    </Link>
                    <Link href="/lease-inspections" passHref>
                      <NavLink
                        className={
                          router.pathname == "/lease-inspections" && "active"
                        }
                      >
                        Open Homes
                      </NavLink>
                    </Link>
                    {/* <Link href="/maintenance-request-form" passHref>
                      <NavLink
                        className={
                          router.pathname == "/maintenance-request-form" &&
                          "active"
                        }
                      >
                        Maintenance request form
                      </NavLink>
                    </Link> */}
                    {/* <Link href="/rental-application-form" passHref>
                      <NavLink
                        className={
                          router.pathname == "/rental-application-form" &&
                          "active"
                        }
                      >
                        Rental Application Form
                      </NavLink>
                    </Link> */}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  nav
                  isOpen={dropDown.sold}
                  toggle={dropDownToggle}
                >
                  <DropdownToggle
                    nav
                    name="sold"
                    caret
                    className={
                      (router.pathname == "/sold" && "active") ||
                      (router.pathname == "/request-appraisal" && "active")
                    }
                  >
                    Sell
                  </DropdownToggle>
                  <DropdownMenu>
                    <Link href="/request-appraisal" passHref>
                      <NavLink
                        className={
                          router.pathname == "/request-appraisal" && "active"
                        }
                      >
                        Request an Appraisal
                      </NavLink>
                    </Link>
                    <Link href="/sold" passHref>
                      <NavLink
                        className={router.pathname == "/sold" && "active"}
                      >
                        Sold Properties
                      </NavLink>
                    </Link>
                  </DropdownMenu>
                </Dropdown>
                <NavItem>
                  <Link href="/projects" passHref>
                    <NavLink
                      className={router.pathname == "/projects" && "active"}
                    >
                      Projects
                    </NavLink>
                  </Link>
                </NavItem>
                <Dropdown
                  nav
                  isOpen={dropDown.about}
                  toggle={dropDownToggle}
                  
                >
                  <DropdownToggle
                    nav
                    caret
                    name="about"
                    className={
                      // (router.pathname == "/projects" && "active") ||
                      (router.pathname == "/who-we-are" && "active") ||
                      // (router.pathname == "/projects" && "active") ||
                      (router.pathname == "/career" && "active")
                    }
                  >
                    About Us
                  </DropdownToggle>
                  <DropdownMenu>
                    <Link href="/who-we-are" passHref>
                      <NavLink
                        className={router.pathname == "/who-we-are" && "active"}
                      >
                        Who we are
                      </NavLink>
                    </Link>
                    {/*<Link href="/projects" passHref>
                      <NavLink
                        className={router.pathname == "/projects" && "active"}
                      >
                        Projects
                      </NavLink>
                    </Link>*/}
                    <Link href="/career" passHref>
                      <NavLink
                        className={router.pathname == "/career" && "active"}
                      >
                        Career
                      </NavLink>
                    </Link>
                    <Link href="/privacy-policy" passHref>
                      <NavLink
                        className={router.pathname == "/privacy-policy" && "active"}
                      >
                        Privacy Policy
                      </NavLink>
                    </Link>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  nav
                  isOpen={dropDown.contact}
                  toggle={dropDownToggle}
                >
                  <DropdownToggle
                    nav
                    name="contact"
                    caret
                    className={
                      (router.pathname == "/offices" && "active") ||
                      (router.pathname == "/agents" && "active")
                    }
                  >
                    Contact
                  </DropdownToggle>
                  <DropdownMenu>
                    <Link href="/offices" passHref>
                      <NavLink
                        className={router.pathname == "/offices" && "active"}
                      >
                        Our Offices
                      </NavLink>
                    </Link>
                    <Link href="/agents" passHref>
                      <NavLink
                        className={router.pathname == "/agents" && "active"}
                      >
                        Our Agents
                      </NavLink>
                    </Link>
                  </DropdownMenu>
                </Dropdown>
                {/* <NavItem>
                <NavLink className={router.pathname == "/sell" && "active"} href="/sell">Sold</NavLink>
              </NavItem> */}
              </Nav>
              <Nav navbar className="align-items-center">
                {/* <NavItem>
                  <Link href="/about"><NavLink className={router.pathname == "/about" && "active"} >About</NavLink></Link>
                </NavItem> */}

                <div
                  className="ml-lg-3 position-relative"
                  onClick={modalToggle}
                >
                  {/* <UncontrolledDropdown nav>
                    <DropdownToggle nav  className="btn-dropdown">
                      <Button color="secondary"><i className="fa fa-file-text-o"></i> <span>Request an Appraisal</span></Button>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <Link href="/"><NavLink className={router.pathname == "/" && "active"} >Sale Appraisal</NavLink></Link>
                      <Link href="/"><NavLink className={router.pathname == "/" && "active"} >rental Appraisal</NavLink></Link>
                    </DropdownMenu>
                  </UncontrolledDropdown> */}

                  <Button color="secondary" className="rounded-0 font2" style={{border:"none"}}>
                    <span className="mr-2">Request an Appraisal</span>{" "}
                    <i className="fa fa-file-text-o"></i>
                  </Button>
                </div>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
