import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

type DashboardCardType = {
  data: {
    title: string,
    value: string
  }
}
export default function DashboardCard({ data }: DashboardCardType) {
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
