import React from 'react';
import {
  Text, View, Image, TouchableOpacity, Linking,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import {
  useNavigation, useRoute, RouteProp,
} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import { IncidentProps } from '../../interfaces';
import styles from './styles';

type ParamList = {
  Detail: {
    incident: IncidentProps;
  };
}

const Detail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();

  const { incident } = route.params;

  const message = `Olá ${incident.name}, gostaria de ajudar no caso "${incident.title}" com o valor de
    ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

  const navigateBack = (): void => {
    navigation.goBack();
  };

  const sendMail = (): void => {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  };

  const sendWhatsapp = (): void => {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf} </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat(
            'pt-BR', { style: 'currency', currency: 'BRL' },
          ).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-Mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Detail;
