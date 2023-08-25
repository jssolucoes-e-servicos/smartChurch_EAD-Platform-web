import { useRouter } from 'next/router';
import React from "react";
import { toast } from "react-toastify";

type LessonListTitleType = {
  tag: string,
  data: any
}

export default function LessonListTitle({ tag, data }: LessonListTitleType) {
  const router = useRouter();
  const handleLesson = (data: any) => {
    toast.info(`Abrindo aula: ${data.lesson.name}`);
    router.push(`/portal/aluno/meus-cursos/${tag}/assistir/${data.lesson.slug}`);
  }

  return (
    <React.Fragment>
      {data.concluded === true ? (
        <strong>{data.lesson.name}</strong>
      ) : (
        <a href="#assistir" onClick={() => handleLesson(data)}><strong>{data.lesson.name}</strong></a>
      )
      }
    </React.Fragment >
  );

}