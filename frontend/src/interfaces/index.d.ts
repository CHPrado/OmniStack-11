export interface OngProps {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
}

export interface IncidentProps {
  id?: number;
  ongId?: OngProps['id'];
  title: string;
  description: string;
  value: number;
}
