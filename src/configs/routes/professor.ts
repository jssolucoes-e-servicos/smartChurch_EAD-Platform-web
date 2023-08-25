var base = 'portal/professor'
var routes = [
  {
    path: "/",
    name: "Início",
    icon: "ni ni-tv-2 text-primary",
     layout: `${base}`,
  },
  {
    path: "/meus-cursos",
    name: "Meus Cursos",
    icon: "ni ni-planet text-blue",
     layout: `${base}`,
  },
  {
    path: "/cursos",
    name: "Cursos Disponíveis",
    icon: "ni ni-pin-3 text-orange",
     layout: `${base}`,
  },
  {
    path: "/avaliacoes",
    name: "Provas e Avalições",
    icon: "ni ni-single-02 text-yellow",
     layout: `${base}`,
  },
  {
    path: "/leituras",
    name: "Leituras",
    icon: "ni ni-bullet-list-67 text-red",
     layout: `${base}`,
  },
  {
    path: "/historico",
    name: "Histórico",
    icon: "ni ni-key-25 text-info",
     layout: `${base}`,
  },
];
export default routes;
