type Ro = {
  occurrence_number?: string;
  monitor_registration?: number;
  ro_created?: string;
  user_name?: string;
  user_email?: string;
  department?: string;
};

const payloadSendEmailRo = (sendMail: Ro) => {
  return {
    to: [sendMail.user_email],
    subject: `Aviso de R.O. Registro de Ocorrência Operacional para sua área | N° ${sendMail.occurrence_number}`,
    text: `Olá ${sendMail.user_name},\n\n
          Informamos que uma nova ocorrência foi atribuída para você no Portal ADM ETT, módulo R.O.:\n\n
          Número da Ocorrência: ${sendMail.occurrence_number}\n
          Registro efetuado por: ${sendMail.monitor_registration}\n
          Data de Abertura: ${sendMail.ro_created}\n
          Departamento: ${sendMail.department}\n\n
          Você pode visualizar esta ocorrência e acompanhar o seu progresso através do Portal ADM ETT, módulo R.O..\n\n
          Caso não reconheça estas informações, pedimos que informe ao departamento de cadastro do Portal ADM ETT pelo e-mail: atendimento@ettcarapicuiba.com.br\n
          Nunca informe seus dados de acesso para outras pessoas.\n
          Este é um e-mail automático de uso do Portal ADM ETT.\nNÃO utilize-o para RESPONDER !\n`,
    html: `<h2><strong>Aviso de R.O. Registro de Ocorrência Operacional para sua área | N° ${sendMail.occurrence_number}</strong></h2>
          <h2>Olá ${sendMail.user_name}</h2>
          <p>Informamos que uma nova ocorrência foi atribuída para você no Portal ADM ETT, módulo R.O.:</p>
          <p><strong>Número da Ocorrência:</strong> ${sendMail.occurrence_number}<br>
          <strong>Registro efetuado por:</strong> ${sendMail.monitor_registration}<br>
          <strong>Data de Abertura:</strong> ${sendMail.ro_created}<br>
          <strong>Departamento:</strong> ${sendMail.department}</p>
          <p>Você pode visualizar esta ocorrência e acompanhar o seu progresso através do Portal ADM ETT, módulo R.O..</p>
          <p>Caso não reconheça estas informações, pedimos que informe ao departamento de cadastro do Portal ADM ETT pelo e-mail: atendimento@ettcarapicuiba.com.br</p>
          <p>Nunca informe seus dados de acesso para outras pessoas.</p>
          <p>Este é um e-mail automático de uso do Portal ADM ETT.</p>
          <p>NÃO utilize-o para RESPONDER !</p>`,
  };
};

export default payloadSendEmailRo;
