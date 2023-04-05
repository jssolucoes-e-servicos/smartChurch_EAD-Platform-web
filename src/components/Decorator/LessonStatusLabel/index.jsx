import React from 'react';

export default function LessonStatusLabel({ lesson }) {
  const { concluded, eadStatus } = lesson;

  const spanText = concluded === true ? 'CONCLUÍDA' : (eadStatus === "UNSUBSCRIBED" ? 'PENDENTE' : 'ASSISTINDO');
  const spanColor = concluded === true ? '#2dce89' : (eadStatus === "UNSUBSCRIBED" ? '#f5365c' : '#ffd600');

  return (
    <span
      style={{ color: spanColor, fontWeight: "bold" }}>{spanText}</span>
  );
}