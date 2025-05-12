export const errorMessages = (field: string, size?: number) => {
  return {
    "date.base": `O campo ${field} deve ser uma data válida`,
    "number.base": `O campo ${field} deve ser um número`,
    "number.min": `O campo ${field} deve ter pelo menos ${size} dígitos`,
    "number.max": `O campo ${field} deve ter no máximo ${size} dígitos`,
    "string.base": `O campo ${field} deve ser do tipo texto (string)`,
    "string.min": `O campo ${field} deve ter pelo menos ${size} caractere`,
    "string.max": `O campo ${field} deve ter no máximo ${size} caractere`,
    "string.email": `O campo ${field} deve ser um e-mail válido`,
    "string.empty": `O campo ${field} não pode estar vazio`,
    "array.base": `O campo ${field} deve ser um array`,
    "array.includesRequiredUnknowns": `O campo ${field} contém itens inválidos`,
    "array.min": `O campo ${field} deve ter pelo menos ${size} itens`,
    "any.required": `O campo ${field} é obrigatório`,
    "any.allowOnly": `O campo ${field} permite apenas valores nulos`,
  };
};
