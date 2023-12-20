export const hasEmptyValues = (obj) => {
  // const objeto = {
  //   TipoSubGrupo: subGroupType,
  //   Grupo: group,
  //   Subgrupo: subgroup,
  //   Cupos: stock,
  //   TipoGrupo: groupType,
  //   Modulo: module
  // };
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === undefined) {
      return true;
    }
  }
  return false;
};
