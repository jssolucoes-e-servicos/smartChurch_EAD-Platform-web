export default function LessonRedir() {
  return   <div/>; 
}


export const getServerSideProps  = async (ctx) => {
  return {
    redirect: {
      destination: '/app/meus-cursos',
      permanent: false
    }
  };
}