const greeting = () => {
  const horaStr = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "numeric",
    hour12: false,
  }).format(new Date());

  const hora = Number(horaStr);

  if (hora >= 0 && hora < 6) {
    return "boa madrugada";
  } else if (hora >= 6 && hora < 12) {
    return "bom dia";
  } else if (hora >= 12 && hora < 18) {
    return "boa tarde";
  } else {
    return "boa noite";
  }
};

export default greeting;
