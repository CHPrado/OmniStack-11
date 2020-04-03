export interface OngProps {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
}

export interface IncidentProps {
  id: number;
  title: string;
  description: string;
  value: number;
  ongId: OngProps['id'];
}

export interface OngIncidentProps extends Omit<OngProps, 'id'>, IncidentProps {}
