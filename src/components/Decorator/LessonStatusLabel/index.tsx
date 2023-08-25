type LessonStatusLabelType = {
  lesson : {
    eadStatus: string
  }
}

export default function LessonStatusLabel({ lesson: {eadStatus} }:LessonStatusLabelType) {

  const handleSpanColor = (eadStatus:string) => {
    let result;
    switch (eadStatus) {
      case 'UNSUBSCRIBED':
        result = '#FF5722'
        break;
      case 'SUBSCRIBED':
        result = '#2dce89'
        break;
      case 'CONCLUDED':
        result = '#1976D2'
        break;
      case 'SUSPENSE':
        result = '#F44336'
        break;
      default:
        result = '#D32F2F'
        break;
    }
    return result;
  }

  const handleSpanText = (eadStatus:string) => {
    let result;
    switch (eadStatus) {
      case 'UNSUBSCRIBED':
        result = 'Não Liberado'
        break;
      case 'SUBSCRIBED':
        result = 'Disponível'
        break;
      case 'CONCLUDED':
        result = 'Assistido'
        break;
      case 'SUSPENSE':
        result = 'Cancelado'
        break;
      default:
        result = '<< Erro >>'
        break;
    }
    return result;
  }

  return (
    <span
      style={{ color: handleSpanColor(eadStatus), fontWeight: "bold" }}>{handleSpanText(eadStatus)}</span>
  );
}