const translateFrom = 'áàâãäåāăąÁÂÃÄÅĀĂĄèééêëēĕėęěĒĔĖÉĘĚìíîïìĩīĭÌÍÎÏÌĨĪĬóôõöōŏőÒÓÔÕÖŌŎŐùúûüũūŭůÙÚÛÜŨŪŬŮçÇÿ&,.ñÑ';
const translateTo = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeeeeeeiiiiiiiiiiiiiiiiooooooooooooooouuuuuuuuuuuuuuuuccy_--nn';

export const getSlug = (sequelize, text) => {
  const lowerCase = sequelize.fn('lower', text);
  const replacedSpaces = sequelize.fn('replace', lowerCase, ' ', '-');
  const withoutDiactric = sequelize.fn('translate', replacedSpaces, translateFrom, translateTo);
  return sequelize.fn('regexp_replace', withoutDiactric, "E'[^\\w -]'", '', 'g')
};
