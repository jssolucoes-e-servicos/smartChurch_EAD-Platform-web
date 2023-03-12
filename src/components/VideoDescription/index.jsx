import React, { Fragment } from 'react';
import {
  Card,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import md5 from "md5";

export default function VideoDescription({ data }) {
  return (
    <Fragment>
      <div className='ml-2 mt-2'>
        <h3>{data.name}</h3>
        <p>{data.description}</p>
      </div>
      <Card className="p-2">
        <CardTitle tag="h5">Esta aula foi ministrada por</CardTitle>
        <div className='row'>
          <div className='col-md-2'>
            <picture>
              {data.teacher.person.photo !== null ? (
                <img src={data.teacher.person.email}
                  class="rounded-circle" alt={data.teacher.person.name} />
              ) : (
                <img src={`https://www.gravatar.com/avatar/${md5(
                  data.teacher.person.email)}`}
                  class="rounded-circle" alt={data.teacher.person.name} />
              )}
            </picture>
          </div>
          <div className='col-md-8'>
            <CardTitle tag="h4">{data.teacher.person.name}</CardTitle>
            <CardSubtitle className=" text-muted" tag="h4">
              {data.teacher.bio}
            </CardSubtitle>
          </div>
        </div>
      </Card>
    </Fragment>
  );
}
