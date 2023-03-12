import React from 'react';
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

export default function DashboardCard({ data }) {
  return (
    <Col lg="6" xl="3">
      <Card className="card-stats mb-4 mb-xl-0">
        <CardBody>
          <Row>
            <div >
              <CardTitle
                tag="h5"
                className="text-uppercase text-muted mb-0"
              >
                {data.title}
              </CardTitle>
              <span className="h2 font-weight-bold mb-0">{data.value}</span>
            </div>
          </Row>
        </CardBody>
      </Card>
    </Col >
  );
}
