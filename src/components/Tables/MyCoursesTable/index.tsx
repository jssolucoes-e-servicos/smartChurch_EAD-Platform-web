import { StudantOnClassesType } from "@/@types/courses";
import moment from "moment";
import Link from "next/link";

import {
  Table
} from "reactstrap";

interface MyCoursesTableDataType {
  data:Array<StudantOnClassesType>;
}

export default function MyCoursesTable({ data = [] } : MyCoursesTableDataType){
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
              const lessonsLentgh = item.StudantOnLesson?.length;
              let conludedCount = 0;
              item.StudantOnLesson?.map(lesson => {
                if (lesson) { }
                if (lesson.concluded === true) { conludedCount += 1 }
              });
              const percentage = ((conludedCount / lessonsLentgh) * 100);
              const progressColor = percentage >= 75 ? '#2dce89' : (percentage >= 25 ? '#ffd600' : '#f5365c');
              return (
                <tr key={`item-${item.id}`}>
                  <td><Link href={`/portal/aluno/meus-cursos/${item.class?.slug}`}>{item.class.course.name}</Link></td>
                  <td>{item.class.name}</td>
                  <td>{item.StudantOnLesson.length}</td>
                  <td>
                    <span style={{ color: progressColor, fontWeight: 'bold' }}>{percentage} %</span>
                    <div className="progress" style={{ height: 5 }} role="progressbar" aria-label="Progresso" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar" style={{ width: `${percentage}%`, backgroundColor: progressColor }}></div>
                    </div>
                  </td>
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