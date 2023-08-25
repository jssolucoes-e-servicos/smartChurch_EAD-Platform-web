import DashboardCard from "@/components/DashboardCard";
import { useState } from "react";
import { Container, Row } from "reactstrap";

export default function Header({ cards = null }) {
  const [cardsData, setCardsData] = useState<any|null>(null);

  /*   useEffect(async () => {
       if (cards !== null) {
        try {
          setInterval(() => {
            setCardsData(null);
          }, 2000);
        } catch (err) {
          toast.error(`Ops! ${err}`);
          setInfoLoad('Falha ao calcular estatícas!');
          console.error(err);
        }
      }
  
  
    }, []); */

  return (
    <div className={`header bg-blue pb-${cards !== null ? '8' : '5'} pt-5 pt-md-8`}>
      <Container fluid>
        <div className="header-body">
          {cards !== null && (
            <Row>
              {cardsData !== null &&
                cardsData.map(({card, index} : any) => {
                  return (
                    <DashboardCard key={`header-card-${index}`} data={card} />
                  );
                })}
            </Row>
          )}
        </div>
      </Container>
    </div>
  );
}
