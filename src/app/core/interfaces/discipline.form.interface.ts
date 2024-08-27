export interface DisciplineFormInterface{
    id: string | undefined | null;
    id_creator : string | undefined |null;
    name:  string | undefined |null;
    description:  string | undefined |null;
    color : string | undefined | null;
    date_creation : Date | undefined | null;
}


export interface DisciplineFormInterfaceCreated{

    id_creator : string | undefined |null;
    name:  string | undefined |null;
    description:  string | undefined |null;
    color : string | undefined | null;
    date_creation : Date | undefined | null;
  }