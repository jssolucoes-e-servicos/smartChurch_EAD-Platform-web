import React, { Fragment } from 'react';
import {
  Card,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

export default function FutureImplementation() {
  return (
    <Fragment>
      <Card className="p-2">
        <CardTitle tag="h5">Este recurso estará disponível para você em breve</CardTitle>
        <CardSubtitle className=" text-muted" tag="h4">
          Estamos sempre evoluino nosso sistema, para que você posso <b>crescer</b> e <b>avanar</b>
        </CardSubtitle>
      </Card>
    </Fragment>
  );
}
