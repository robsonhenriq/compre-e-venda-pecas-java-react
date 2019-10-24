import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Row } from 'reactstrap';

const Footer = props => (
  <div className=" page-content">
    {/* <Col md="12">
        <p>
          <Translate contentKey="footer">Your footer</Translate>
        </p>
      </Col> */}

    <Row className="footer text-light">
      {/* SOBRE */}
      <div className="col-md-4 col-lg-4 col-xl-4">
        <h5>Sobre</h5>
        <hr className="bg-white mb-4 mt-0 d-inline-block mx-auto w-25" />
        <p className="mb-0">Encontre os melhores preços e produtos automobilisticos do mercado a sua disposição em apenas um click.</p>
      </div>

      {/* INFORMAÇÕES */}
      <div className="col-md-4 col-lg-4 col-xl-4">
        <h5>Informações</h5>
        <hr className="bg-white mb-4 mt-0 d-inline-block mx-auto w-25" />
        <ul className="list-unstyled">
          <li>
            <a href="">Link 1</a>
          </li>
          <li>
            <a href="">Link 2</a>
          </li>
          <li>
            <a href="">Link 3</a>
          </li>
          <li>
            <a href="">Link 4</a>
          </li>
        </ul>
      </div>

      {/* CONTATO */}
      <div className="col-md-4 col-lg-4 col-xl-4">
        <h5>Contato</h5>
        <hr className="bg-white mb-4 mt-0 d-inline-block mx-auto w-25" />
        <ul className="list-unstyled">
          <li>
            <i className="fa fa-home mr-2" /> Compre e venda peças
          </li>
          <li>
            <i className="fa fa-envelope mr-2" /> compre.venda.pecas@gmail.com
          </li>
          <li>
            <i className="fa fa-phone mr-2" /> + 55 (11) 4021-2039
          </li>
          <li>
            <i className="fa fa-print mr-2" /> + 55 (11) 4021-2039
          </li>
        </ul>
      </div>
    </Row>
  </div>
);

export default Footer;
