var base = '/matriculas/cma';
var routes = [
  {
    path: "/",
    name: "Início",
    icon: "ni ni-tv-2 text-primary",
    layout: `${base}`,
  },
  {
    path: "/alunos",
    name: "Alunos",
    icon: "ni ni-planet text-blue",
    layout: `${base}`,
  },
  {
    path: "/pendencias",
    name: "Pendências",
    icon: "ni ni-pin-3 text-orange",
     layout: `${base}`,
  },
  {
    path: "/relacionados",
    name: "Relacionados",
    icon: "ni ni-key-25 text-info",
     layout: `${base}`,
  },
];
export default routes;
