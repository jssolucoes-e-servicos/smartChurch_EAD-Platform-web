import Header from "@/components/_partials/Header";
import api from "@/services/api";
import { getAPIClient } from "@/services/axios-module";
import AlunoTemplate from "@/templates/AlunoTemplate";
import { withSSRAuth } from "@/utils/withSSRAuth";
import moment from "moment";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Table
} from "reactstrap";

export default function MyCoursesTable(data:any[]){
  return(
    <Table className="align-items-center table-flush table-strip" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Curso</th>
                <th scope="col">Turma</th>
                <th scope="col">Total de Aulas</th>
                <th scope="col">Realizado</th>
                <th scope="col">Matriculado em</th>
              </tr>
            </thead>
            <tbody>
              {
                data ? (
                  data.map(item => {
                    /*  let realizeds = 0;
                     item.class.course.CourseLesson.map(lesson=>{
                       if lesson.
                     }); */
                    return (
                      <tr key={`item-${item.id}`}>
                        <td><Link href={`/ava/meus-cursos/${item.class.slug}`}>{item.class.course.name}</Link></td>
                        <td>{item.class.name}</td>
                        <td>{item.class.course.CourseLesson.length}</td>
                        <td>{`<< Não Calculado >>`}</td>
                        <td> {moment(item.createdAt).format('DD/MM/YYYY')}</td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td className={`text-${infoLoad === 'Nenhum registro' ? 'danger' : 'primary'
                      } pl-5 pt-2`}>
                      {infoLoad}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
  )
}