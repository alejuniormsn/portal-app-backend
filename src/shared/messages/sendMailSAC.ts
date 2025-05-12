type Sac = {
  ticket_number?: string;
  title?: string;
  sac_created?: string;
  user_name?: string;
  user_email?: string;
  department?: string;
};

const payloadSendEmailSac = (sendMail: Sac) => {
  return {
    to: [sendMail.user_email],
    subject: `Aviso de Abertura de Chamado SAC para sua Área | N° ${sendMail.ticket_number}`,
    text: `Olá ${sendMail.user_name},\n\n
          Informamos que um novo chamado foi atribuído para você no Portal ADM ETT, módulo SAC:\n\n
          Número do Chamado: ${sendMail.ticket_number}\n
          Título: ${sendMail.title}\n
          Data de Abertura: ${sendMail.sac_created}\n
          Departamento: ${sendMail.department}\n\n
          Você pode visualizar este chamado e acompanhar o seu progresso através do Portal ADM ETT, módulo SAC.\n\n
          Caso não reconheça estas informações, pedimos que informe ao departamento de cadastro do Portal ADM ETT pelo e-mail: atendimento@ettcarapicuiba.com.br\n
          Nunca informe seus dados de acesso para outras pessoas.\n
          Este é um e-mail automático de uso do Portal ADM ETT.\nNÃO utilize-o para RESPONDER !\n`,
    html: `<h2><strong>Aviso de Abertura de Chamado SAC para sua Área | N° ${sendMail.ticket_number}</strong></h2>
          <h2>Olá ${sendMail.user_name}</h2>
          <p>Informamos que um novo chamado foi atribuído para você no Portal ADM ETT, módulo SAC:</p>
          <p><strong>Número do Chamado:</strong> ${sendMail.ticket_number}<br>
          <strong>Título:</strong> ${sendMail.title}<br>
          <strong>Data de Abertura:</strong> ${sendMail.sac_created}<br>
          <strong>Departamento:</strong> ${sendMail.department}</p>
          <p>Você pode visualizar este chamado e acompanhar o seu progresso através do Portal ADM ETT, módulo SAC.</p>
          <p>Caso não reconheça estas informações, pedimos que informe ao departamento de cadastro do Portal ADM ETT pelo e-mail: atendimento@ettcarapicuiba.com.br</p>
          <p>Nunca informe seus dados de acesso para outras pessoas.</p>
          <p>Este é um e-mail automático de uso do Portal ADM ETT.</p>
          <p>NÃO utilize-o para RESPONDER !</p>`,
  };
};

export default payloadSendEmailSac;
